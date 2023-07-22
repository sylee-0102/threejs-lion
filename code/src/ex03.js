import * as THREE from 'tree';
import dat from 'dat.gui';

// ----- 주제: 완전 기본 장면 구성

export default function example() {
	
  // 렌더러 만들기
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.webGLRenderer({
    // canvas: canvas,
    canvas,

  });

  // 브라우저 사이즈로 지정하겠다
  renderer.setSize(window.innerWidth, window.innerHeight);


  // 씬 만들기
  const scene = new THREE.Scene();

  //카메라
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각(field of view)
    window.innerWidth / window.innerHeight, // 화면비(aspect) /window 전역객체는 생략이 가능함
    0.1,
    1000
  );
    // camera PositionalAudio.x = 0;
    // camera PositionalAudio.x = 2;
    // camera PositionalAudio.x = 5;
    camera.position.set(0,2,5);

    // 메쉬
    const geometry = new THREE.BoxGeometry(1, 1, 1); // 가로, 높이, 깊이
    const material = new THREE.MeshBasicMaterial({ // 유일하게 조명이 없어도 보이는 아이
      color: 'red'
    });
    const box = new THREE.Mesh(geometry, material);
    box.position.y = 0.5;
    // scene.add(box);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeomtry(10, 10),
      new THREE.MeshBasicMaterial({ color: 'lightgray' })
    );
    floor.rotation.x = THREE.MathUtils.degToRad(-90);
    scene.add(box, floor);


    // 반복해서 그리기
    function draw() {
      renderer.render(scene, camera);
      renderer.setAnimationLoop(draw);
      // window.requestAnimationFrame(draw);
    }
    draw();

    // GUI
    const gui = new dat.GUI();

    const aa = {
      x: 0,
      y: 2
    }

    gui.add(
      camera.position,
      'x',
      -10, 10,
      0.01
    );
}
