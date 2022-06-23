
function rand(max,min){
    return Math.floor(Math.random()*(max-min)+min)
  }

function getAngleDeg(ax,ay,bx,by) {
  var angleRad = Math.atan((ay-by)/(ax-bx));
  var angleDeg = angleRad * 180 / Math.PI;
  
  return(angleDeg);
}

function getDistance(xA, yA, xB, yB) { 
	var xDiff = xA - xB; 
	var yDiff = yA - yB;

	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

// // limits value to the range min..max
// function clamp(val, min, max) {
//   return Math.max(min, Math.min(max, val))
// }

// // Find the closest point to the circle within the rectangle
// // Assumes axis alignment! ie rect must not be rotated
// var closestX = clamp(this.brickX, rectangle.x, rectangle.x + rectangle.width);
// var closestY = clamp(circle.Y, rectangle.y, rectangle.y + rectangle.height);

// // Calculate the distance between the circle's center and this closest point
// var distanceX = circle.X - closestX;
// var distanceY = circle.Y - closestY;

// // If the distance is less than the circle's radius, an intersection occurs
// var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
// return distanceSquared < (circle.Radius * circle.Radius);