/**
 * Created by Javier on 12/11/2014.
 */
define(function(require){

	'use strict';

	var Engine          = require('game/Engine');
	var MessageEngine   = require('game/MessageEngine');


	var NetworkEngine = new Engine();


	NetworkEngine.socket = null;

	NetworkEngine.addEvents([
		'message'  // On Server Message Received
	]);

	NetworkEngine.init = function()
	{
		this.socket = new WebSocket("ws://localhost:8060");

		this.socket.onopen = onConnectionOpen;

		this.socket.onmessage = onServerMessage;
	}

	NetworkEngine.send = function(message)
	{
		this.socket.send(JSON.stringify(message));
	}

	function onConnectionOpen()
	{
		console.log("Socket has been opened!");
	}

	function onServerMessage(pkt)
	{
		try {
			var  message = MessageEngine.process(pkt);
			NetworkEngine.fireEvent("message",message);
		} catch(err) {
			alert(err);
		}
	}




	return NetworkEngine;

});