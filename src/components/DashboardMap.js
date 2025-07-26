import React, { useEffect, useRef, useState } from 'react';

const DashboardMap = ({ devices = [] }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const attemptsRef = useRef(0);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    console.log('🔄 useEffect ejecutándose...');
    console.log('🔑 API Key:', apiKey ? 'Disponible' : 'No disponible');

    if (!apiKey) {
      setError('API Key no configurada');
      return;
    }

    // Evitar ejecuciones múltiples
    if (mapInstanceRef.current) {
      console.log('📌 Mapa ya creado, evitando duplicación');
      return;
    }

    // Función para inicializar el mapa
    const initializeMap = () => {
      attemptsRef.current++;
      console.log('🗺️ initializeMap ejecutándose... Intento:', attemptsRef.current);
      console.log('📍 mapRef.current:', mapRef.current);
      console.log('🌐 window.google:', !!window.google);
      
      // Debug adicional del DOM
      console.log('🔍 Debug del DOM:');
      console.log('  - document.readyState:', document.readyState);
      console.log('  - Elementos con ref en DOM:', document.querySelectorAll('[data-map-ref]').length);
      
      // Buscar el elemento por otros medios
      const mapElements = document.querySelectorAll('[data-map-ref="dashboard"]');
      console.log('  - Elementos encontrados por data-attribute:', mapElements.length);
      
      if (mapElements.length > 0) {
        console.log('  - Usando elemento encontrado por data-attribute');
        mapRef.current = mapElements[0];
      }

      // Verificar el elemento del DOM
      if (!mapRef.current) {
        console.log('❌ mapRef.current es null');
        
        // Máximo 15 intentos (aumenté el límite)
        if (attemptsRef.current < 15) {
          console.log('🔄 Reintentando en 500ms...');
          setTimeout(initializeMap, 500); // Aumenté el tiempo
          return;
        } else {
          console.log('❌ Máximo de intentos alcanzado');
          setError('No se pudo encontrar el elemento del mapa después de varios intentos');
          return;
        }
      }

      // Verificar que el elemento esté en el DOM
      if (!document.body.contains(mapRef.current)) {
        console.log('❌ Elemento no está en el DOM');
        if (attemptsRef.current < 10) {
          setTimeout(initializeMap, 300);
          return;
        } else {
          setError('El elemento del mapa no está en el DOM');
          return;
        }
      }

      // Verificar dimensiones
      const rect = mapRef.current.getBoundingClientRect();
      console.log('✅ Elemento encontrado, dimensiones:', {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left
      });

      if (rect.width === 0 || rect.height === 0) {
        console.log('❌ Elemento sin dimensiones válidas');
        if (attemptsRef.current < 10) {
          setTimeout(initializeMap, 300);
          return;
        } else {
          setError('El elemento del mapa no tiene dimensiones válidas');
          return;
        }
      }

      try {
        console.log('🚀 Creando instancia del mapa...');
        
        // Crear el mapa
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 4.6097, lng: -74.0817 }, // Bogotá
          zoom: 11,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP
        });

        // Guardar referencia para evitar recreaciones
        mapInstanceRef.current = map;

        // Datos de prueba
        const sampleDevices = [
          { id: 1, lat: 4.6097, lng: -74.0817, name: 'Panel Solar Centro', type: 'solar', status: 'active' },
          { id: 2, lat: 4.6511, lng: -74.0472, name: 'Turbina Norte', type: 'wind', status: 'active' },
          { id: 3, lat: 4.5981, lng: -74.0758, name: 'Panel Solar Sur', type: 'solar', status: 'maintenance' }
        ];

        // Agregar marcadores con InfoWindows
        sampleDevices.forEach(device => {
          const marker = new window.google.maps.Marker({
            position: { lat: device.lat, lng: device.lng },
            map: map,
            title: device.name
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 12px; font-family: Arial, sans-serif; max-width: 200px;">
                <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: bold;">${device.name}</h3>
                <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">
                  <strong>Tipo:</strong> ${device.type === 'solar' ? 'Panel Solar' : 'Turbina Eólica'}
                </p>
                <p style="margin: 0; color: ${device.status === 'active' ? '#059669' : '#d97706'}; font-size: 14px; font-weight: bold;">
                  <strong>Estado:</strong> ${device.status === 'active' ? 'Activo' : 'Mantenimiento'}
                </p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });

        console.log('🎉 Mapa creado exitosamente con', sampleDevices.length, 'dispositivos');
        setMapLoaded(true);
        setError(null);

      } catch (err) {
        console.error('💥 Error creando mapa:', err);
        setError('Error al crear el mapa: ' + err.message);
      }
    };

    // Función para cargar Google Maps
    const loadGoogleMaps = () => {
      // Si ya está cargado
      if (window.google && window.google.maps) {
        console.log('📋 Google Maps ya está disponible');
        setTimeout(initializeMap, 500); // Dar tiempo para que el DOM se renderice
        return;
      }

      console.log('📥 Cargando script de Google Maps...');
      
      // Verificar si ya hay un script cargándose
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        console.log('� Script ya existe, esperando...');
        const checkLoaded = () => {
          if (window.google && window.google.maps) {
            setTimeout(initializeMap, 500);
          } else {
            setTimeout(checkLoaded, 200);
          }
        };
        checkLoaded();
        return;
      }

      const script = document.createElement('script');
      const callbackName = 'initGoogleMapDashboard' + Date.now();
      
      // Callback global
      window[callbackName] = () => {
        console.log('🎯 Google Maps script cargado exitosamente');
        delete window[callbackName];
        setTimeout(initializeMap, 500);
      };

      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}&loading=async`;
      script.async = true;
      script.defer = true;
      
      script.onerror = () => {
        console.error('💥 Error al cargar Google Maps script');
        setError('No se pudo cargar Google Maps');
        delete window[callbackName];
      };

      document.head.appendChild(script);
    };

    // Resetear contador de intentos
    attemptsRef.current = 0;
    
    // Iniciar la carga
    loadGoogleMaps();

    return () => {
      // Cleanup al desmontar
      attemptsRef.current = 0;
    };
  }, [apiKey]); // Solo depender de apiKey

  // Mostrar error
  if (error) {
    return (
      <div className="w-full h-96 bg-red-50 border-2 border-red-200 rounded-lg flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-red-500 text-2xl mb-3">🗺️❌</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error en el Mapa</h3>
          <p className="text-red-700 mb-3">{error}</p>
          <p className="text-sm text-red-600">
            API Key: {apiKey ? `${apiKey.substring(0, 12)}...` : 'No configurada'}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            🔄 Recargar Página
          </button>
        </div>
      </div>
    );
  }

  // Mostrar cargando
  if (!mapLoaded) {
    return (
      <div className="w-full">
        <div className="w-full h-96 bg-blue-50 border-2 border-blue-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Cargando Mapa</h3>
            <p className="text-blue-600">Preparando ubicaciones de dispositivos...</p>
            <p className="text-sm text-blue-500 mt-2">Intento: {attemptsRef.current}/10</p>
          </div>
        </div>
        
        {/* Elemento del mapa siempre presente */}
        <div className="w-full h-0 overflow-hidden">
          <div 
            ref={mapRef} 
            data-map-ref="dashboard"
            className="w-full h-96"
            style={{ 
              minHeight: '384px',
              visibility: 'hidden',
              position: 'absolute',
              top: '-9999px'
            }}
          />
        </div>
      </div>
    );
  }

  // Mostrar mapa
  return (
    <div className="w-full">
      {/* Header de éxito */}
      <div className="mb-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-green-600 text-xl mr-3">✅</span>
            <div>
              <h3 className="font-semibold text-green-800">Mapa Cargado Exitosamente</h3>
              <p className="text-sm text-green-600">3 dispositivos encontrados en Bogotá</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-700">Activo</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-gray-700">Mantenimiento</span>
            </div>
          </div>
        </div>
      </div>

      {/* Instrucciones */}
      <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">💡</span>
          <span>Haz clic en los marcadores para ver información detallada de cada dispositivo</span>
        </div>
      </div>

      {/* Contenedor del mapa */}
      <div className="w-full h-96 rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg bg-gray-100">
        <div 
          ref={mapRef} 
          data-map-ref="dashboard"
          className="w-full h-full"
          style={{ minHeight: '384px' }}
        />
      </div>

      {/* Footer con información */}
      <div className="mt-4 text-sm text-gray-500 text-center">
        <p>📍 Mostrando dispositivos de energía renovable en Bogotá, Colombia</p>
      </div>
    </div>
  );
};

export default DashboardMap;
