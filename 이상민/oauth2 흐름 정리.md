Http 요청 [/oauth2/authorization/{아무거나}]  ->

OAuth2AuthorizationRequestRedirectFilter 작동 ->

DefaultOAuth2AuthorizationRequestResolver 작동 registrationId 받아옴 -> 
Application.properties에 등록된 registrationId 로 보내진 요청이라면 

OAuth2LoginAuthenticationProvider의 authenticate() 실행 -> 

userService(DefaultOAuth2UserService)의 loadUser() 실행->

DefaultOAuth2User 리턴 ->

AbstractAuthenticationProcessingFilter에 도달 -> 

AbstractAuthenticationProcessingFilter.successfulAuthentication() 작동->

SecurityContextHolder 속에 Authentication 저장 ->

successHandler.onAuthenticationSuccess() 호출