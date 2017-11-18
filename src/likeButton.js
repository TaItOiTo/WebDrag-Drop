import React from "react";

export default class LikeButton extends React.Component {
    render() {
        return (
            <span>いいねボタン予定地</span>
        );
    }
}
// 以下を書くときは、index.htmlに<div id='like-button'></div>が必要
// ReactDom.render(
//     <LikeButton />,
//     document.getElementById("like-button")
// );
