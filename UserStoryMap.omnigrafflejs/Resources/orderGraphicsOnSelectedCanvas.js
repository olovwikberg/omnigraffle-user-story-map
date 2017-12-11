var _ = function(){
	var action = new PlugIn.Action(function(selection){
		console.log(selection);
		margin = 0.3;
		activityColor = Color.RGB(0.93, 0.71, 0.26);
		epicColor     = Color.RGB(0.83, 0.92, 0.94);
		storyColor    = Color.RGB(0.92, 0.91, 0.55);

		function widthOf(shape)
		{
			// find upper left
			maxX = -1000000.0;
			minX = 1000000.0;

			for(var i = 0; i < shape.shapeVertices.length; i++)
			{
				point = shape.shapeVertices[i];
				maxX = Math.max(point.x, maxX);
				minX = Math.min(point.x, minX);
			}
			for(var i = 0; i < shape.shapeControlPoints.length; i++)
			{
				point = shape.shapeControlPoints[i];
				maxX = Math.max(point.x, maxX);
				minX = Math.min(point.x, minX);
			}

			return maxX - minX;
		}

		function heightOf(shape)
		{
			// find upper left
			maxY = -1000000.0;
			minY = 1000000.0;

			for(var i = 0; i < shape.shapeVertices.length; i++)
			{
				point = shape.shapeVertices[i];
				maxY = Math.max(point.y, maxY);
				minY = Math.min(point.y, minY);
			}
			for(var i = 0; i < shape.shapeControlPoints.length; i++)
			{
				point = shape.shapeControlPoints[i];
				maxY = Math.max(point.y, maxY);
				minY = Math.min(point.y, minY);
			}

			return maxY - minY;
		}

		function subtractTo00(shape)
		{
			// find upper left
			lowestX = 1000000.0;
			lowestY = 1000000.0;

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

		function moveShapeTo(shape, col, row, shapeWidth, shapeHeight, margin)
		{
			subtractTo00(shape);
			addTo(shape, 
				col * shapeWidth * (1 + margin), 
				row * shapeHeight * (1 + margin));
		}

		// Grab first canvas found
		// activities = document.windows[0].selection.canvas.outlineRoot.children;
		// Use current selection
		activities = selection.canvas.outlineRoot.children;

		columnCount = 0;
		for (var i = 0; i < activities.length; i++){
			activity = activities[i];
			activity.col = columnCount;
			activity.row = 0;
			if(activity.children.length>0)
			{
				for (var j = 0; j < activity.children.length; j++)
				{
					epic = activity.children[j];
					epic.col = columnCount;
					epic.row = 1;
					for (var k = 0; k < epic.children.length; k++)
					{
						story = epic.children[k];
						story.col = columnCount;
						story.row = 2 + k;
					}
					columnCount++;
				}
			}
			else
			{
				columnCount++;
			}
		}

		for (var i = 0; i < activities.length; i++){
			activity = activities[i];
			activity.graphic.fillColor = activityColor;
			activity.graphic.fillType = FillType.Solid;
			activity.graphic.textColor = Color.black;
			for (var j = 0; j < activity.children.length; j++)
			{
				epic = activity.children[j];
				epic.graphic.fillColor = epicColor;
				epic.graphic.fillType = FillType.Solid;
				epic.graphic.textColor = Color.black;
				for (var k = 0; k < epic.children.length; k++)
				{
					story = epic.children[k];
					story.graphic.fillColor = storyColor;
					story.graphic.fillType = FillType.Solid;
					story.graphic.textColor = Color.black;
				}
			}
		}

		maxWidth  = 0;
		maxHeight = 0;

		for (var i = 0; i < activities.length; i++){
			activity = activities[i];
			maxWidth  = Math.max(widthOf (activity.graphic), maxWidth );
			maxHeight = Math.max(heightOf(activity.graphic), maxHeight);
			for (var j = 0; j < activity.children.length; j++)
			{
				epic = activity.children[j];
				maxWidth  = Math.max(widthOf (epic.graphic), maxWidth );
				maxHeight = Math.max(heightOf(epic.graphic), maxHeight);
				for (var k = 0; k < epic.children.length; k++)
				{
					story = epic.children[k];
					maxWidth  = Math.max(widthOf (story.graphic), maxWidth );
					maxHeight = Math.max(heightOf(story.graphic), maxHeight);
				}
			}
		}

		shapeWidth  = maxWidth;
		shapeHeight = maxHeight;

		for (var i = 0; i < activities.length; i++){
			activity = activities[i];
			moveShapeTo(activity.graphic, activity.col, activity.row, shapeWidth, shapeHeight, margin);
			for (var j = 0; j < activity.children.length; j++)
			{
				epic = activity.children[j];
				moveShapeTo(epic.graphic, epic.col, epic.row, shapeWidth, shapeHeight, margin);
				for (var k = 0; k < epic.children.length; k++)
				{
					story = epic.children[k];
					moveShapeTo(story.graphic, story.col, story.row, shapeWidth, shapeHeight, margin);
				}
			}
		}
	});

	// result determines if the action menu item is enabled
	action.validate = function(selection){

		// Snippet to see if specific graphic object is selected
		// // check to see if any graphics are selected
		// // if called externally (from script) generate selection object
		// if (typeof selection == 'undefined')
		// {
		// 	selection = document.windows[0].selection
		// }

		// if (selection.graphics.length > 0)
		// {
		// 	return true
		// }
		// else
		// {
		// 	return false
		// }
		
		if(selection != 'undefined')
		{
			return true;
		}
		else
		{
			return false;
		}
	};

	return action;
}();
_;