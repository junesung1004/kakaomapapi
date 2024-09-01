"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const navigate = useParams();
  const url = decodeURIComponent(navigate.slug);
  const [search, setSearch] = useState(""); // setSearch를 사용하면 실시간으로 출력이되고 api가 과부하가 올 수 있기에 검색을 하고 버튼을 눌렀을때 하는 로직을 추가해야함
  const [realSearch, setRealSearch] = useState(""); // <<-- 이 코드가 바로 그 코드
  const [place, setPlace] = useState([]);
  const [currentPostion, setCurrentPosition] = useState({
    latitude: null,
    longitude: null,
  });

  //카카오 스크립트 호출
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = true;
    // 카카오 맵 스크립트 URL에 환경 변수 사용
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API}&autoload=false&libraries=LIBRARY&libraries=services&libraries=services,clusterer,drawing`;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.onload = () => {
      // 스크립트가 온로드되고
      window.kakao.maps.load(() => {
        // 카카오맵.load 기능이 준비되면 아래의 코드 실행
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
              latitude,
              longitude,
            });
            const container = document.getElementById("map"); // 지도를 그려줄 영역
            const options = {
              // 카카오지도 기능중 하나인 위도,경도로 센터를 잡고 지도 확대/축소 설정
              center: new window.kakao.maps.LatLng(latitude, longitude),
              level: 3,
            };
            //새로운 객체를 생성해서 map에다 저장하기
            const map = new window.kakao.maps.Map(container, options);
            if (realSearch) {
              searchPlace(realSearch, map, currentPostion.latitude, currentPostion.longitude);
            }
          });
        }
      });
    };
  }, []);

  //리얼서치를 할때마다 해당 검색되는 기능을 추가시켜주는 로직
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    if (mapContainer && realSearch) {
      const options = {
        // 카카오지도 기능중 하나인 위도,경도로 센터를 잡고 지도 확대/축소 설정
        center: new window.kakao.maps.LatLng(currentPostion.latitude, currentPostion.longitude),
        level: 5,
      };
      const map = new window.kakao.maps.Map(mapContainer, options);
      searchPlace(realSearch, map, currentPostion.latitude, currentPostion.longitude);
    }
  }, [realSearch]);

  //키워드 기반 검색함수
  const searchPlace = (location, map, latitude, longitude) => {
    const ps = new window.kakao.maps.services.Places();
    const searchOptions = {
      location: new window.kakao.maps.LatLng(latitude, longitude),
      radius: 2000, // 자기 위치 기반 반경 설정 코드
    };
    ps.keywordSearch(
      location,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlace(data);
          const bounds = new window.kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            displayMarker(map, data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        }
      },
      searchOptions
    );
  };

  //마커를 표시해주는 함수
  const displayMarker = (map, place) => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });
  };

  const handleClickSearch = () => {
    setRealSearch(search);
  };

  return (
    <div>
      <h1>카테고리 페이지</h1>
      <p>여기는 {url}카테고리 페이지입니다..</p>

      <form method="POST" action="">
        <input
          type="text"
          id="search"
          name="search"
          placeholder="검색창"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <label />
        <input type="button" value={"입력"} onClick={() => handleClickSearch()} />
      </form>
      <div>{realSearch}</div>
      <div id="map" style={{ width: "100%", height: "360px", backgroundColor: "white" }}></div>
      <p>
        <em>지도를 클릭해주세요dd!</em>
      </p>

      <div id="clickLatlng"></div>
    </div>
  );
}

/*

            //검색기반
            
            

         
*/

/*
 // //지도를 클릭한 위치에 표출할 마커입니다
            // const marker = new kakao.maps.Marker({
            //   // 지도 중심좌표에 마커를 생성합니다.
            //   position: map.getCenter(),
            // });
            // // 지도에 마커를 표시합니다
            // marker.setMap(map);

            // var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

            // // 지도에 클릭 이벤트를 등록합니다
            // // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
            // kakao.maps.event.addListener(map, "click", function (mouseEvent) {
            //   // 클릭한 위도, 경도 정보를 가져옵니다
            //   var latlng = mouseEvent.latLng;

            //   // 마커 위치를 클릭한 위치로 옮깁니다
            //   marker.setPosition(latlng);

            //   var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
            //   message += "경도는 " + latlng.getLng() + " 입니다";

            //   var resultDiv = document.getElementById("clickLatlng");
            //   resultDiv.innerHTML = message;
            // });
*/
