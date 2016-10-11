"use strict";

export default  {
  url: "orders?status&auction&title&order",
  parent: "app",
  templateProvider: function ($stateParams, AuthService) {
    let userType = AuthService.getCurrentUserType();

    if (userType === 'operator' && $stateParams.auction === '2') {
      return "<packs></packs>"
    } else {
      return "<orders-list></orders-list>"
    }
  }

}
