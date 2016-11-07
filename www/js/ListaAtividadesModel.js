function getListaAtividades(){
  this.items = [];

  var lista = localStorage.getItem("ListaAtividades");

  if (lista !== null) {
    this.items = angular.fromJson(lista);
  }

  this.save = function(){
    var lista = angular.toJson(this.items);
    localStorage.setItem("ListaAtividades", lista);
  }

  this.adicionar = function(item){
    this.items.push(item);
  };

  this.remove = function(item){
    var pos = this.items.indexOf(item);
    this.items.splice(pos, 1);
  };
}
