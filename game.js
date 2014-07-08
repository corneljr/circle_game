function Game(circleCount, duration) {
	this.score = 0;
	this.circles = [];
	this.duration = (duration || 10) * 1000;


	this.start = function() {
		for (var i = 0; i < 10; i++) {
			this.circles.push(new Circle());
			this.circles[i].render();
			this.circles[i].move();
		}

		$('#score').text(this.score);
		setTimeout(this.stop, this.duration);
	}

	this.stop = function() {
		alert('GAME OVER!');
		for (var i = 0; i < this.circleCount; i++) {
			game.circles[i].$me.remove();
		}
	}
}

function Circle() {
	this.x = Math.random() * 420;
	this.y = Math.random() * 420;
	this.diameter = 30 + Math.random() * 50;
	this.speed = 500 + Math.random() * 1500;

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
		var _this = this;
		this.$me.animate({
		left: Math.random() * 420,
		top: Math.random() * 420
	}, {
		duration: this.speed,
		complete: function() {
			_this.move();
			}
		});
	};

	this.kill = function() {
    this.$me.css('background-color', 'red')
      .effect({
        effect: 'explode',
        duration: 100,
        complete: function() {
          $(this).remove();
          $("#score").text(window.game.score += 100);
        },
        queue: false
    });
  };
}


$(document).ready( function() {
	var game = new Game(10,10)
	game.start();

});

