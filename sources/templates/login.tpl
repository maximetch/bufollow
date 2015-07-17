<div ng-show="vm.error" class="alert alert-danger">{{vm.error}}</div>

<form name="form" ng-submit="vm.login()" role="form" novalidate>
  <md-input-container>
    <label>Username / email</label>
    <input type="text" id="name" ng-model="vm.name" required/>
  </md-input-container>

  <md-input-container>
    <label>Password</label>
    <input type="password" id="password" ng-model="vm.password" required/>
  </md-input-container>

  <div>
    <md-button class="md-raised md-primary" ng-disabled="form.$invalid || vm.dataLoading">Login</md-button>
    <md-button href="#/register" class="md-raised">Register</md-button>
  </div>
</form>