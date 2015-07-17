<div layout="row" layout-align="center center" class="buf-login">
  <div transparent-content class="buf-login__card">
    <div layout-padding layout="row" layout-align="center center" >
      <img src="images/logo.png" class="buf-login__logo" />
    </div>
    <!-- logInForm.$invalid || vm.dataLoading -->
    <div layout="row" layout-align="center center" class="buf-login__card__content">
      <div class="buf-login__card__forms" layout-padding>
        <form layout-padding name="logInForm" ng-submit="vm.login() role="form" novalidate ng-show="!vm.isRegistering">
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

        <div class="md-actions" layout="row" layout-padding layout-align="end center">
          <div ng-show="!vm.isRegistering">
            <md-button href="#/register" class="md-primary" ng-click="vm.isRegistering=true">Don't have an account?</md-button>
            <md-button class="md-primary md-raised">Log In</md-button>
          </div>

          <div ng-show="vm.isRegistering">
            <md-button href="#/register" class="md-primary" ng-click="vm.isRegistering=false">Back to Log In</md-button>
            <md-button class="md-raised md-primary">Sign Up</md-button>
          </div>
        </div>
      </div>
    </md-content>
  </div>
</divt>