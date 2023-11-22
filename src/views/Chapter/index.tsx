import React from 'react';
import { CanvaParam } from 'src/services/apiConfig';

function Chapter(canvas: CanvaParam) {
  return (
    <div>
      <img src={canvas[0].image_url} height={100} alt="url" />
    </div>
  );
}
export default Chapter;
