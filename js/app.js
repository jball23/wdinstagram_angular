"use strict";

(function(){
  angular
    .module("wdinstagram", [
      "ui.router",
      "ngResource"
    ])
    .config(["$stateProvider",
    RouterFunction
    ])
    .controller("InstaIndexController", InstaIndexFunc)
    .controller("InstaShowController", InstaShowFunc)
    .factory("InstaFactory", InstaFactoryFunc)

  function RouterFunction($stateProvider){
    $stateProvider
      .state("instaIndex", {
        url: "/photos",
        templateUrl: "js/index.html",
        controller: "InstaIndexController",
        controllerAs: "indexVm"
      })
      .state("instaShow", {
        url: "/photos/:id",
        templateUrl: "js/show.html",
        controller: "InstaShowController",
        controllerAs: "showVm"
      })
  }

  InstaIndexFunc.$inject = ["InstaFactory"];
  function InstaIndexFunc(InstaFactory){
    var indexVm = this;
    indexVm.photos = InstaFactory.query();
    indexVm.newPhoto = new InstaFactory();

    indexVm.create = function($state){
      indexVm.newPhoto.$save().then(function(res){
        indexVm.photos.push(res)
      })
    };
  }

  InstaShowFunc.$inject = ["InstaFactory", "$stateParams"];
  function InstaShowFunc(InstaFactory, $stateParams){
    var showVm = this;
    showVm.photo = InstaFactory.get({id: $stateParams.id});

    showVm.update = function(){
      showVm.photo.$update({id: $stateParams.id});
    }

    showVm.delete = function(){
      showVm.photo.$delete({id: $stateParams.id});
    }
  };

  InstaFactoryFunc.$inject = [ "$resource"];
  function InstaFactoryFunc($resource){
    return $resource("http://localhost:3000/entries/:id", {}, {
      update: {method: "PUT"}
    });
  }

})();
