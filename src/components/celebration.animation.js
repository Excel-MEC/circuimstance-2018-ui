import React, { Component } from 'react'

import styles from './celebration.animation.module.css'


var Point = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  };
  
var Particle = function(ctx, p0, p1, p2, p3) {
    this.ctx = ctx;
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  
    this.time = 0;
    this.duration = 3 + Math.random() * 1;
    this.color =  '#' + Math.floor((Math.random() * 0xffffff)).toString(16);
  
    this.w = 8;
    this.h = 6;
  
    this.complete = false;
  };
  
  Particle.prototype = {
    update: function() {
      // (1/60) is timeStep
      this.time = Math.min(this.duration, this.time + (1/60));
  
      var f = Ease.outCubic(this.time, .0125, 1, this.duration);
      var p = cubeBezier(this.p0, this.p1, this.p2, this.p3, f);
  
      var dx = p.x - this.x;
      var dy = p.y - this.y;
  
      this.r =  Math.atan2(dy, dx) + (Math.PI * 0.5);
      this.sy = Math.sin(Math.PI * f * 10);
      this.x = p.x;
      this.y = p.y;
  
      this.complete = this.time === this.duration;
    },
    draw: function() {
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.r);
      this.ctx.scale(1, this.sy);
  
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(-this.w * 0.5, -this.h * 0.5, this.w, this.h);
  
      this.ctx.restore();
    }
  };
  
  function CelebrationCanvas(canvas, width, height) {
    var particles = [];
    var ctx = canvas.getContext('2d');
  
    canvas.width = width;
    canvas.height = height;
    createParticles();
  
    function animate() {
      requestAnimationFrame(loop);
    }
  
    function createParticles() {
      for (var i = 0; i < 128; i++) {
        var p0 = new Point(width * 0.5, height * 0.5);
        var p1 = new Point(Math.random() * width, Math.random() * height);
        var p2 = new Point(Math.random() * width, Math.random() * height);
        var p3 = new Point(Math.random() * width, height + 64);
  
        particles.push(new Particle(ctx, p0, p1, p2, p3));
      }
    }
  
    function update() {
      particles.forEach(function(p) {
        p.update();
      });
    }
  
    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(function(p) {
        p.draw();
      });
    }
  
    function loop() {
      update();
      draw();
  
      if (checkParticlesComplete()) {
        // reset
        particles.length = 0;
        createParticles();
        setTimeout(function(){
          animate();
        }, (Math.random()*2000));
      }else {
        animate();
      } 
    }
  
    function checkParticlesComplete() {
      for (var i = 0; i < particles.length; i++) {
        if (particles[i].complete === false) return false;
      }
      return true;
    }
  
    return {
      animate: animate
    };
  }
  
  
  
  
  /**
   * easing equations from http://gizma.com/easing/
   * t = current time
   * b = start value
   * c = delta value
   * d = duration
   */
  var Ease = {
      inCubic: function (t, b, c, d) {
          t /= d;
          return c*t*t*t + b;
      },
      outCubic: function(t, b, c, d) {
          t /= d;
          t--;
          return c*(t*t*t + 1) + b;
      },
      inOutCubic: function(t, b, c, d) {
          t /= d/2;
          if (t < 1) return c/2*t*t*t + b;
          t -= 2;
          return c/2*(t*t*t + 2) + b;
      },
      inBack: function (t, b, c, d, s) {
          s = s || 1.70158;
          return c*(t/=d)*t*((s+1)*t - s) + b;
      }
  };
  
  function cubeBezier(p0, c0, c1, p1, t) {
      var p = new Point();
      var nt = (1 - t);
  
      p.x = nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x;
      p.y = nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y;
  
      return p;
  }

  export default class Celebration  extends Component{

    componentDidMount(){
        const celebrationCanvas = new CelebrationCanvas(
            this.canvas, this.props.width , this.props.height)
        setTimeout(() => {
            celebrationCanvas.animate()
        })

    }
    render(){
        return (
            <div className={styles['celebration-canvas-container']}>
                <canvas ref={c => this.canvas = c } style={{
                    height: this.props.height,
                    width: this.props.width
                }}></canvas>
            </div>
        )
    }
}