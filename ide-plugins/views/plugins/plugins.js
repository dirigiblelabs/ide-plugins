/*
 * Copyright (c) 2010-2022 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v20.html
 *
 * Contributors:
 *   SAP - initial API and implementation
 */

const pluginsView = angular.module('plugins', ['ideUI', 'ideView']);

pluginsView.config(["messageHubProvider", function (messageHubProvider) {
	messageHubProvider.eventIdPrefix = 'plugins-view';
}]);

pluginsView.controller('PluginsController', ['$scope', '$http', 'messageHub', function ($scope, $http, messageHub) {

	let pluginsApi = '/services/v4/js/ide-plugins/views/plugins/plugins-service.js';

	function loadPlugins() {
		$http.get(pluginsApi + "?url=https://www.dirigible.io/depots.json")
			.then(function (data) {
				$scope.depots = data.data;
				$scope.depots.forEach(function (depot) {
					$http.get(pluginsApi + "?url=" + depot.depot)
						.then(function (data) {
							depot.plugins = data.data;
						});
				});
			});
	}

	loadPlugins();
}]);