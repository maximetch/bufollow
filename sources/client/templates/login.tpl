<div layout="row" layout-align="center center" class="buf-login">
  <md-content transparent-content>
    <md-card class="buf-login-card">
      <md-content layout-padding>
        <form name="logInForm" ng-submit="vm.login()" role="form" novalidate ng-show="!vm.isRegistering">
          <md-input-container>
            <label>Username / email</label>
            <input type="text" id="username" ng-model="vm.username" required/>
          </md-input-container>

          <md-input-container>
            <label>Password</label>
            <input type="password" id="password" ng-model="vm.password" required/>
          </md-input-container>
        </form>

        <form name="signUpForm" ng-submit="vm.signup()" role="form" novalidate ng-show="vm.isRegistering">
          <md-input-container>
            <label>Username</label>
            <input type="text" id="username" ng-model="vm.username" required/>
          </md-input-container>

          <md-input-container>
            <label>Email</label>
            <input type="email" id="username" ng-model="vm.email" required/>
          </md-input-container>

          <md-input-container>
            <label>Password</label>
            <input type="password" id="password" ng-model="vm.password" required/>
          </md-input-container>

        </form>
      </md-content>

      <div class="md-actions" layout="row" layout-padding layout-align="end center">
        <div ng-show="!vm.isRegistering">
          <md-button href="#/register" class="md-primary" ng-click="vm.isRegistering=true">Don't have an account?</md-button>
          <md-button class="md-primary md-raised" ng-disabled="logInForm.$invalid || vm.dataLoading">Log In</md-button>
        </div>

        <div ng-show="vm.isRegistering">
          <md-button href="#/register" class="md-primary" ng-click="vm.isRegistering=false">Back to Log In</md-button>
          <md-button class="md-raised md-primary" ng-disabled="signUpForm.$invalid || vm.dataLoading">Sign Up</md-button>
        </div>
      </div>
    </md-card>
  </md-content>
</divt>