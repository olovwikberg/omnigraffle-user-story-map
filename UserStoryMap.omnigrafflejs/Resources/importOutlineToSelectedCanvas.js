var _ = function(){
	var action = new PlugIn.Action(function(selection){


		function createStoryMap()
		{
			topicColumn = columns[2]
			sliceColumn = columns[3]
			res = []

			function getTopic(activity)
			{
				if(activity.valueForColumn(topicColumn))
				{
					return activity.valueForColumn(topicColumn).string
				}
				else
				{
					return "empty"
				}
			}

			function getSlice(activity)
			{
				if(activity.valueForColumn(sliceColumn))
				{
					return parseInt(activity.valueForColumn(sliceColumn).toString())
				}
				else
				{
					return -1
				}
			}

			for(i = 0; i < rootItem.children.length; i++)
			{
				activity = rootItem.children[i]
				activityDict = {}

				activityDict.topic = getTopic(activity)
				activityDict.slice = getSlice(activity)
				activityDict.children = []

				for(j = 0; j < activity.children.length; j++)
				{
					epic = activity.children[j]
					epicDict = {}

					epicDict.topic = getTopic(epic)
					epicDict.slice = getSlice(epic)
					epicDict.children = []

					for(j = 0; j < epic.children.length; j++)
					{
						story = epic.children[j]
						storyDict = {}

						storyDict.topic = getTopic(story)
						storyDict.slice = getSlice(story)
						storyDict.children = []

						epicDict.children.push(storyDict)
					}

					activityDict.children.push(epicDict)
				}

				res.push(activityDict)
			}

			return JSON.stringify(res)
		}

		var alert = new Alert("Import OmniOutliner as Story Map", "This script will import the topics from the current OmniOutliner document to OmniGraffle as canvas slides.\n\nShould the script continue?")
		alert.addOption("Import on current canvas")
		// alert.addOption("Import in new document")
		alert.addOption("Stop")
		alert.show(function(result){
			if (result == 1/*2*/){
				throw new Error('script cancelled')
			} else {
				// var scriptURL = URL.tellScript("omnigraffle", createStoryMap.toString() + '\n' + 'createStoryMap()')
				// scriptURL.call(function(reply){})

				var scriptURL = URL.tellScript("omnioutliner", createStoryMap.toString() + '\n' + 'createStoryMap()')
				scriptURL.call(function(reply){
					// if (result == 1){
					// 	Document.makeNewAndShow(function(){})
					// }

					jsonReply = JSON.parse(reply)
					console.log(JSON.stringify(jsonReply, null, 2))
					// console.log(jsonReply.children[0])
				})
			}
		})



	});

	// result determines if the action menu item is enabled
	action.validate = function(selection){
		// if(selection != 'undefined')
		// {
		// 	return true;
		// }
		// else
		// {
		// 	return false;
		// }

		return true;
	};

	return action;
}();
_;