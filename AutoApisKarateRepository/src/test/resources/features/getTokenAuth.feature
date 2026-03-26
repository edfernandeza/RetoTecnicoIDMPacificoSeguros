@loginAuto
Feature: Login
  Background:
    * def endpoint = "https://serverest.dev/login"
    * def tokenSchema = call read('classpath:Schemas/login.js')
    * def requestLogin = read('classpath:/Data/login/login.json')

  Scenario Outline: Obtener Token Exitosamente
    Given url endpoint
    When request {"email": "<mail>", "password": "<pass>"}
    And method POST
    Then status 200
    And match response == tokenSchema
    * def accessToken = response.access_token
  Examples:
    |mail|pass|
    |asdsdrano@qa.com.br|teste|