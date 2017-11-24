var _ = function(){
	var action = new PlugIn.Action(function(selection){
		versNum = this.plugIn.version.versionString
		pluginName = this.plugIn.displayName
		pluginID = this.plugIn.identifier
		pluginLibraries = this.plugIn.libraries
		if (pluginLibraries.length != 0){
			libraryNames = []
			pluginLibraries.forEach(function(aLibrary){
				libraryName = aLibrary.name
				libraryVersion = aLibrary.version.versionString
				displayString = libraryName + ' v' + libraryVersion
				libraryNames.push(displayString)
			})
			libraryNamesString = "LIBRARIES:"
			libraryNamesString = libraryNamesString + '\n' + libraryNames.join('\n')
		} else {
			libraryNamesString = "This plugin has no libraries."
		}
		alertTitle = pluginName + ' v.' + versNum
		descriptionString = "Orders graphics in a canvas hierarchically like in a user story map. May be used to create user story maps from OmniOutliner files.\n\nAlso gives nice Post-it® colors :)"
		companyURL = 'https://github.com/olovwikberg/omnigraffle-user-story-map'
		alertMessage = "©2017 Olov Wikberg" + '\n'
		alertMessage = alertMessage + pluginID + '\n'
		alertMessage = alertMessage + companyURL + '\n' + '\n'
		alertMessage = alertMessage + descriptionString + '\n' + '\n' 
		alertMessage = alertMessage + libraryNamesString
		var alert = new Alert(alertTitle, alertMessage)
		alert.show(function(result){})
	});

	// routine determines if menu item is enabled
	action.validate = function(selection){
		return true
	};

	return action;
}();
_;