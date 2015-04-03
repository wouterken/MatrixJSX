#include Matrix.jsx

Vector2D = function(x, y){

    if ( !(this instanceof arguments.callee) ) {
        return new Vector2D(x, y);
    }

    Matrix.apply(this, [[x],[y]]);
    this.x = x;
    this.y = y;
    if(this.rows != 3 || this.columns != 1){
        throw new Error("Error: a 3D Vector must have 3 coordinates");
    }
    
    return this;
}
Vector2D.prototype = new Matrix(true);

Vector2D.prototype.toVector3D = function(){
    return new Vector3D(x, y, 0);
}