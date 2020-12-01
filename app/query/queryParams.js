(function () {
    'use strict';

    angular.module('map.query')
        .factory('queryParams', queryParams);

    queryParams.$inject = ['QueryBuilder'];

    function queryParams(QueryBuilder) {
        var defaultParams = {
            traits: null,
            fromYear: null,
            toYear: null,
            fromDay: null,
            toDay: null,
            scientificName: null,
            source: null
        };

        var params = {
            build: buildQuery,
            clear: clear
        };

        activate();
        return params;
    
        function activate() {
            clear();
        }


       function buildQuery() {
           var builder = new QueryBuilder();

           if (params.traits) {
               builder.add("+measurementType:\"" + params.traits+"\"");
           }
           if (params.fromYear) {
               builder.add("+yearCollected:>=" + params.fromYear);
           }
           if (params.toYear) {
               builder.add("+yearCollected:<=" + params.toYear);
           }  
           if (params.minValue) {
                builder.add("+measurementValue:>=" + params.minValue);
           }    
           if (params.maxValue) {
                builder.add("+measurementValue:<=" + params.maxValue);
           }    
           if (params.scientificName) {
               builder.add("+scientificName:" + params.scientificName);
           }
           if (params.genus) {
               builder.add("+genus:" + params.genus);
           }
           if (params.measurementUnit) {
               builder.add("+measurementUnit:" + params.measurementUnit);
           }
           if (params.source) {
              builder.add("+projectId:" + params.source);
           }           
           return builder.build();
        }
    
       function clear() {
           angular.extend(params, defaultParams);
       }
    }
})();
