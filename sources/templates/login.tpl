<div ng-show="vm.error" class="alert alert-danger">{{vm.error}}</div>
ff
<div class="row">
  <form class="col s12" name="form" ng-submit="vm.login()" role="form">
    <div class="row">
      <div class="input-field col s12">
        <input type="text" id="name" ng-model="vm.name" required/>
        <label for="name">Username / email</label>
      </div>
    </div>

    <div class="row">
      <div class="input-field col s12">
        <input id="password" type="password" ng-model="vm.password" required>
        <label for="password">Password</label>
      </div>
    </div>

    <div class="row form-actions col s12">
      <button type="submit" ng-disabled="form.$invalid || vm.dataLoading" class="waves-effect waves-light btn btn-primary">Login</button>
      <a href="#/register" class="waves-effect waves-light btn btn-link">Register</a>
    </div>
  </form>
</div>