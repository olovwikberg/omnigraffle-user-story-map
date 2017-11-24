function subtractTo00(shape)
{
	// find upper left
	lowestX = 100000.0;
	lowestY = 100000.0;

	for(var i = 0; i < shape.shapeVertices.length; i++)
	{
		point = shape.shapeVertices[i];
		lowestX = Math.min(point.x, lowestX);
		lowestY = Math.min(point.y, lowestY);
	}
	for(var i = 0; i < shape.shapeControlPoints.length; i++)
	{
		point = shape.shapeControlPoints[i];
		lowestX = Math.min(point.x, lowestX);
		lowestY = Math.min(point.y, lowestY);
	}

	lowestPoint = new Point(lowestX, lowestY);

	// // Move shape to 0, 0
	// newShapeVertices = []
	// for(var i = 0; i < shape.shapeVertices.length; i++)
	// {
	// 	point = new Point(shape.shapeVertices[i].x, shape.shapeVertices[i].y);
	// 	point = point.subtract(lowestPoint);
	// 	newShapeVertices.push(point);
	// }
	// shape.shapeVertices = newShapeVertices;

	newShapeControlPoints = []
	for(var i = 0; i < shape.shapeControlPoints.length; i++)
	{
		point = new Point(shape.shapeControlPoints[i].x, shape.shapeControlPoints[i].y);
		point = point.subtract(lowestPoint);
		newShapeControlPoints.push(point);
	}
	shape.shapeControlPoints = newShapeControlPoints;
}

	// Add the new x, y
function addTo(shape, newX, newY)
{
	newPoint = new Point(newX, newY);
	// newShapeVertices = [];
	// for(var i = 0; i < shape.shapeVertices.length; i++)
	// {
	// 	point = new Point(shape.shapeVertices[i].x, shape.shapeVertices[i].y);
	// 	point = point.add(newPoint);
	// 	newShapeVertices.push(point);
	// }
	// shape.shapeVertices = newShapeVertices;

	newShapeControlPoints = [];
	for(var i = 0; i < shape.shapeControlPoints.length; i++)
	{
		point = new Point(shape.shapeControlPoints[i].x, shape.shapeControlPoints[i].y);
		point = point.add(newPoint);
		newShapeControlPoints.push(point);
	}
	shape.shapeControlPoints = newShapeControlPoints;
}

function moveShapeTo(shape, newX, newY)
{
	subtractTo00(shape);
	addTo(shape, newX, newY);
}

shapeWidth = 200;
shapeHeight = 100;

activities = document.windows[0].selection.canvas.outlineRoot.children;

columnCount = 0;
for (var i = 0; i < activities.length; i++){
	activity = activities[i];
	activity.col = columnCount * shapeWidth * 1.4;
	activity.row = 0 * shapeHeight * 1.4;
	for (var j = 0; j < activity.children.length; j++)
	{
		epic = activity.children[j];
		epic.col = columnCount * shapeWidth * 1.4;
		epic.row = 1 * shapeHeight * 1.4;
		for (var k = 0; k < epic.children.length; k++)
		{
			story = epic.children[k];
			story.col = columnCount * shapeWidth * 1.4;
			story.row = (2 + k) * shapeHeight * 1.4;
		}
		columnCount++;
	}
}

for (var i = 0; i < activities.length; i++){
	activity = activities[i];
	console.log("activity=" + activity.col + "," + activity.row)
	for (var j = 0; j < activity.children.length; j++)
	{
		epic = activity.children[j];
		console.log("epic=" + epic.col + "," + epic.row)
		for (var k = 0; k < epic.children.length; k++)
		{
			story = epic.children[k];
			console.log("story=" + story.col + "," + story.row)
		}
	}
}

for (var i = 0; i < activities.length; i++){
	activity = activities[i];
	moveShapeTo(activity.graphic, activity.col, activity.row);
	for (var j = 0; j < activity.children.length; j++)
	{
		epic = activity.children[j];
		moveShapeTo(epic.graphic, epic.col, epic.row);
		for (var k = 0; k < epic.children.length; k++)
		{
			story = epic.children[k];
			moveShapeTo(story.graphic, story.col, story.row);
		}
	}
}
