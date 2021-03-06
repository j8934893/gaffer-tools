/*
 * Copyright 2017-2019 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('app').factory('defaultRestEndpoint', [function() {

    var service = {}

    var defaultRestEndpoint = window.location.origin + "/rest/latest";

    service.get = function() {
        return defaultRestEndpoint;
    }

    service.getMerged = function(gafferEndpoint) {
        var uiPort = window.location.port == undefined ? "" : ":" + window.location.port;
        return (gafferEndpoint.protocol == undefined ? window.location.protocol : (gafferEndpoint.protocol.indexOf(':') != -1 ? gafferEndpoint.protocol : gafferEndpoint.protocol + ':')) + "//" +
        (gafferEndpoint.host == undefined ? window.location.hostname : gafferEndpoint.host) +
        (gafferEndpoint.port == undefined ? uiPort : (":" + gafferEndpoint.port)) +
        (gafferEndpoint.path == undefined ? '/rest/latest' : gafferEndpoint.path);
    }

    return service;

}]);
