/**
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

importScripts('../third_party/three.js/three.min.js');
importScripts('../third_party/draco/DRACOLoader.js');
importScripts('../third_party/draco/draco_decoder.js');
importScripts('../third_party/draco/geometry_helper.js');

onmessage = function (e) {




  THREE.DRACOLoader.setDecoderPath('../third_party/draco/');

  let dracoLoader = new THREE.DRACOLoader();
  this.console.log(e.data.path)
  dracoLoader.load(e.data.path, geometry => {
    //
    geometry.computeVertexNormals();

    var material = new THREE.MeshStandardMaterial({
      vertexColors: THREE.VertexColors
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    //
    postMessage(geometry);
    THREE.DRACOLoader.releaseDecoderModule();
  });
};