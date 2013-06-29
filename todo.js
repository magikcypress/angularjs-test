angular.module('todo', [])
    .factory('currentUser', ['$cookies', function($cookies){
        var key = 'CURRENT_USER';
        var f = function(user){
            if (user) {
                $cookies[key] = user;
            }
            return $cookies[key];
        };
        f.clear = function(){
            delete $cookies[key];
        }; 
        return f;
    }])
    .controller('TodoCtrl', ['$scope', 
    function($scope) {

      $scope.todos = [
        {text:'learn angular', done:true},
        {text:'build an angular app', done:false}];

        $scope.addTodo = function() {
          $scope.todos.push({text:$scope.todoText, done:false});
          $scope.todoText = '';
        };

        $scope.remaining = function() {
          var count = 0;
            angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1;
          });
          return count;
        };

        $scope.archive = function() {
        var oldTodos = $scope.todos;
          $scope.todos = [];
          angular.forEach(oldTodos, function(todo) {
          if (!todo.done) {
            $scope.todos.push(todo);
          }
        });
       };
      }
     ])
    .controller('SettingsController', ['$scope', 
        function($scope){

        var pouchdb = new Pouch('http://localhost:8080/couchdb/astreinte');

        var theUIDS = Pouch.uuids();

        function map(doc) {
          if(doc.type) {
            emit(doc.type, null);
          }
        }

        pouchdb.query({map: map}, function(err, response) {
            // console.log(JSON.stringify(response['rows']));     
        });

        function display() {
          pouchdb.allDocs({include_docs: true, conflicts: true}, function(err, docs) {
            docs.rows.forEach(function(doc) {
              var only = [ { type: doc.doc.type, name: doc.doc.value } ];
              only.push(only);
              var names = $scope.names = only;
            });
          });
        }

        var names = $scope.names = display(); 
        console.log(display());

        $scope.addContact = function() {
           this.names.push({type:'username', value:$scope.username});
           // create entry
           pouchdb.post({ type:'username', value:$scope.username }, function(err, response) { });
        };
       
        $scope.removeContact = function(contactToRemove) {
           var index = this.names.indexOf(contactToRemove);
           this.names.splice(index, 1);
           // deleted entry
           pouchdb.remove(this.names.uid, function(err, info) {});
        };
       
        $scope.addDataContact = function() {
           this.name.contacts.push({type:'email', value:'yourname@example.org'});
        };
       
        $scope.removeDataContact = function(contactToRemove) {
           var index = this.name.contacts.indexOf(contactToRemove);
           this.name.contacts.splice(index, 1);
        };

        // $scope.removeDataContact = function(contactToRemove) {
        //   console.log(contact);
        //   for (var i = 0, ii = this.names.contacts.length; i < ii; i++) {
        //     if (contact === this.names.contacts[i]) {
        //       $scope.names.contacts.splice(i, 1);
        //     }
        //   }
        // };
       
        $scope.clearDataContact = function(contact) {
         contact.type = 'phone';
         contact.value = '';
        };
        }]
    )


      // function SettingsController($scope) {

  
      // }
