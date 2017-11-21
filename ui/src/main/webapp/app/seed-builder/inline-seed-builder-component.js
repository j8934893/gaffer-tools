/*
 * Copyright 2017 Crown Copyright
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

angular.module('app').component('inlineSeedBuilder', inlineSeedBuilder());

function inlineSeedBuilder() {
    return {
        templateUrl: 'app/seed-builder/inline-seed-builder.html',
        controller: InlineSeedBuilderController,
        controllerAs: 'ctrl'
    }
}

function InlineSeedBuilderController(schema, types, graph) {
    var vm = this;
    vm.seedVertexParts = {};
    vm.seedVertexType = undefined;
    vm.seedVertices = '';
    vm.multipleSeeds = false;

    vm.schemaTypes = {};

    schema.get().then(function(gafferSchema) {
        vm.schemaTypes = gafferSchema.types;
    });


    vm.getSchemaVertices = schema.getSchemaVertices

    vm.inputExists = function() {
        if (vm.multipleSeeds) {
            return (vm.seedVertices !== '');
        }
        for(var part in vm.seedVertexParts) {
            if (vm.seedVertexParts[part] && vm.seedVertexParts[part] !== "") {
                return true;
            }
        }
        return false;
    }

    vm.getFields = function() {
        var schemaType = vm.schemaTypes[vm.seedVertexType];
        if (!schemaType) {
            return types.getFields(undefined);
        }
        return types.getFields(schemaType.class);
    }

    vm.getCsvHeader = function() {
        var schemaType = vm.schemaTypes[vm.seedVertexType];
        if (!schemaType) {
            return types.getCsvHeader(undefined);
        }
        return types.getCsvHeader(schemaType.class);
    }

    vm.addSeeds = function() {
        if(vm.multipleSeeds) {
            var vertices = vm.seedVertices.trim().split("\n");
            for(var i in vertices) {
                var vertex = vertices[i];
                var vertexType = vm.seedVertexType;
                var typeClass = vm.schemaTypes[vertexType].class;
                var partValues = vertex.trim().split(",");
                var fields = types.getFields(typeClass);
                if(fields.length != partValues.length) {
                    alert("Wrong number of parameters for seed: " + vertex + ". " + vertexType + " requires " + fields.length + " parameters");
                    break;
                }
                var parts = {};
                for(var j = 0; j< fields.length; j++) {
                    parts[fields[j].key] = partValues[j];
                }
                graph.addSeed(createSeed(vertexType, parts));
            }
        } else {
             graph.addSeed(createSeed(vm.seedVertexType, vm.seedVertexParts));
        }

        reset();

    }

    var reset = function() {
        vm.seedVertex = '';
        vm.seedVertices = '';
        vm.seedVertexParts = {};
    }

    var createSeed = function(type, parts) {
        var typeClass = vm.schemaTypes[type].class;
        var vertex = types.createJsonValue(typeClass, parts);
        return {vertexType: type, vertex: vertex};
    }
}