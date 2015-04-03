﻿#targetengine 3d#include Matrix.jsx#include Matrix3D.jsx#include Vector3D.jsx#include Vector2D.jsx#include Object3D.jsx#include InDesignPolygon.jsxConfig = {            SHOW_NORMALS:false,        PERSPECTIVE:false,        CULL_BACKFACES:true,        DEPTH: 2       }var win;var setSelectionButton;var selection;var xSlider, ySlider, zSlider;var lastX, lastY, lastZ, lastSize;lastX = lastY = lastZ = 360;lastSize = 1;setup();var polyFront = new Poly(                                        [[new Vector3D(1, 1, -1),                                        new Vector3D(1, 0, -1),                                        new Vector3D(0, 0, -1),                                        new Vector3D(0, 1, -1)]],                                        [0, 255, 255], new Vector3D(0.5, 0.5, -100)                                     );                                     var polyBack = new Poly(                                        [[                                        new Vector3D(0, 1, 0),                                        new Vector3D(0, 0, 0),                                        new Vector3D(1, 0, 0),                                        new Vector3D(1, 1, 0)]],                                        [255, 0, 255], new Vector3D(0.5, 0.5, 100)                                     );var polyLeft= new Poly([[                                    new Vector3D(0, 0, 0),                                    new Vector3D(0, 1, 0),                                    new Vector3D(0, 1, -1),                                    new Vector3D(0, 0, -1)]],                                    [255, 255, 0], new Vector3D(-100, 0.5, -0.5)                            );                            var polyRight = new Poly([[                                                                       new Vector3D(1, 0, -1),                                    new Vector3D(1, 1, -1),                                    new Vector3D(1, 1, 0),                                    new Vector3D(1, 0, 0)]],                                    [255, 0, 0], new Vector3D(100, 0.5, -0.5)                                                                );                                                         var polyBottom= new Poly([[                                    new Vector3D( 0,1, 0),                                    new Vector3D( 1,1, 0),                                    new Vector3D( 1,1, -1),                                    new Vector3D( 0,1, -1)]],                                    [0, 255, 0], new Vector3D(0.5, 300, -0.5)                            );                            var polyTop = new Poly([[                                                                        new Vector3D(0,0, -1),                                    new Vector3D(1,0, -1),                                    new Vector3D(1,0, 0),                                    new Vector3D(0,0, 0)]],                                    [0, 0, 255], new Vector3D(0.5, -300, -0.5)                            );                                                                                   selection = new Object3D([polyFront, polyBack, polyRight, polyLeft, polyTop, polyBottom]);selection.applyTransform(Matrix3D.identity().translate(2, 5, 1).scale(10, 10, 10));function setup(){    win = new Window('palette');    setSelectionButton = win.add('button', undefined, 'Set Selection');    setSelectionButton.onClick = function(){                  selection = new Poly(app.selection[0]).toObject3D(Config.DEPTH);            selection.applyTransform(Matrix3D.identity())     };    app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;    xSlider = win.add('slider', undefined, 360, 0, 720);    ySlider = win.add('slider', undefined, 360, 0, 720);    zSlider = win.add('slider', undefined, 360, 0, 720);    sizeSlider= win.add('slider', undefined, 1, 1, 15);        xSlider.onChanging = function(){            var origin = selection.getCenter();            selection.applyTransform(Matrix3D.identity().translate(-origin.x, -origin.y, -origin.z).rotate_x(xSlider.value - lastX).translate(origin.x, origin.y, origin.z));            lastX = xSlider.value;    }    ySlider.onChanging = function(){            var origin = selection.getCenter();            selection.applyTransform(Matrix3D.identity().translate(-origin.x, -origin.y, -origin.z).rotate_y(ySlider.value - lastY).translate(origin.x, origin.y, origin.z));            lastY = ySlider.value;    }    zSlider.onChanging = function(){            var origin = selection.getCenter();            selection.applyTransform(Matrix3D.identity().translate(-origin.x, -origin.y, -origin.z).rotate_z(zSlider.value - lastZ).translate(origin.x, origin.y, origin.z));            lastZ = zSlider.value;    }           sizeSlider.onChanging = function(){        var origin = selection.getCenter();        var scale = 1 + (sizeSlider.value - lastSize)        selection.applyTransform(Matrix3D.identity().translate(-origin.x, -origin.y, -origin.z).scale(scale, scale, scale).translate(origin.x, origin.y, origin.z));        lastSize = sizeSlider.value;    }    win.show();}//var p = new Poly(app.selection[0]);//var m = new Matrix3D([1,0,0],//            [0,1,0],//            [0,0,1]);            //p.applyTransform(Matrix3D.identity().rotate_z(45));//p.draw();