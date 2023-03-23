
    function init() {

        // Escena
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);    
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);

        var size = 500;
        var arrowSize = 40;
        var divisions = 50;
        var origin = new THREE.Vector3( 0, 0, 0 );
        var x = new THREE.Vector3( 1, 0, 0 );
        var y = new THREE.Vector3( 0, 1, 0 );
        var z = new THREE.Vector3( 0, 0, 1 );
        var color1 = new THREE.Color(0x737373); // Color ejes principales
        var color2 = new THREE.Color(0x333333); // Color línea divisiones
        var colorR = new THREE.Color(0xAA0000); // Color Rojo - Red
        var colorG = new THREE.Color(0x00AA00); // Color Verde - Green
        var colorB = new THREE.Color(0x0000AA); // Color Azul -Blue

        // Crear la Grilla
        var gridHelperXZ = new THREE.GridHelper( size, divisions, color1, color2);

        // Flechas
        var arrowX = new THREE.ArrowHelper(x, origin, arrowSize, colorR, 10, 2); // Creación flecha en eje X
        var arrowY = new THREE.ArrowHelper(y, origin, arrowSize, colorG, 10, 2); // Creación flecha en eje Y
        var arrowZ = new THREE.ArrowHelper(z, origin, arrowSize, colorB, 10, 2); // Creación flecha en eje Z
            
        // Cámara
        camera.position.x = 300;
        camera.position.y = 100;
        camera.position.z = 000;
        camera.lookAt(scene.position);

        // Colores
        color = [{ color: 0x9999ee }, { color: 0xffff00 }, { color: 0xff6666 }]; // Array para almacenar colores

        // Geometría para las pirámides
        l = 40; // Lado de la base de la pirámide
        h = 1.5 * l; // Altura de la pirámide
        [v1, v2, v3, v4, v5] = [[0, 0, 0], [l, 0, 0], [l, 0, l], [0, 0, l], [l / 2, h, l / 2]];
        vertices = [v1, v2, v3, v4, v1, v5, v4, v3, v5, v2];
        geom = Geometria(vertices);

        // Materiales para las pirámides
        material = []; // Array para almacenar materiales
        for(i = 0; i < 1; i++)
            material.push(new THREE.ParticleBasicMaterial(color[i]));

        // Creación de pirámides
        fig = []; // Array para almacenar figuras
        for (i = 0; i < 2; i++) {
            fig.push(new THREE.Line(geom, material[i]));
        }
        
        // Trasladar pirámide 2 - fig[1]
        vt = [l, 0, 0]; // Array de traslación
        for (i = 1; i < 2; i++) {            
            fig[i].applyMatrix(Traslacion(vt));
        }
        
        // Escalar piramide 2 - fig[1]
        vs = [1, 1.5, 1]; // Array de escalado
        EscaladoReal(fig[1], vt, vs);

        // Rotar figura 2 - fig[1]
        ejeR = ['x', 'y', 'z']; // Array ejes rotación
        ang = [45, 45, 45]; // Array ángulo giro por eje
        for (i = 0; i < 3; i++) {
            RotacionReal(fig[1], vt, ejeR[i], ang[i]);
        }

        // En el documento HTML
        document.body.appendChild(renderer.domElement);

        // Agregar elementos al escenario
        scene.add(gridHelperXZ);
        scene.add(arrowX);  
        scene.add(arrowY);  
        scene.add(arrowZ);
        for (i = 0; i < 2; i++)
            scene.add(fig[i]);
        renderer.render(scene, camera);
    }

    init();  // otra forma: window.onload = init;
    