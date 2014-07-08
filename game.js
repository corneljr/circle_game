function Game(duration, circleCount) {
	this.score = 0
	this.duration = (duration || 10) * 1000;
	this.circles = [];

	this.start = function() {
		for (var i = 0; i < circleCount; i++) {
			this.circles.push(new Circle());
			this.circles[i].render();
			this.circles[i].move();
		}
		$('.score span').text(window.game.score)
		setTimeout(this.stop, this.duration)
	}

	this.stop = function() {
		$('.circle').fadeOut(400);
		$('.game-end').fadeIn(1000);
		$('.game-end-text').text('Score: ' + window.game.score + ' (click to play again)')
		$('.game-end').on('click', function(){
			setTimeout(
				function(){ location.reload() }, 3000)
		});
	}
}

function Circle() {
	this.diameter = 30 + Math.random() * 50
	this.x = Math.random() * 420
	this.y = Math.random() * 420

	this.render = function() {
		var _this = this
		this.$me = $('<div class="circle"></div>')
			.css('left', this.x)
			.css('top', this.y)
			.css('height', this.diameter)
			.css('width', this.diameter)
			.on('click', function() {
				_this.kill();
			});

		$('.area').append(this.$me);
	};

	this.move = function() {
		var _this = this
		this.$me.animate({
			left: Math.random() * 420,
			top: Math.random() * 420
		}, Math.random() * 2000, function () { 
			_this.move()
		});
	}

	this.kill = function() {
		this.$me.css('background-color', 'red')
			.hide('explode', {
				queue: false,
				complete: function() {
					$(this).remove();
				}
		});
		console.log(this.diameter)
		window.game.score += (80 - Math.floor(this.diameter)) * 100
		$('.score span').text(window.game.score)
	}
}

$(document).ready( function() {
	game = new Game(10,10);
	game.start();
});