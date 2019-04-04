import loadGoogleMapsApi from 'load-google-maps-api'

export default async (context, inject) => {
  const googlemap = await loadGoogleMapsApi({
    key: 'AIzaSyBkUgSgnQJR1z78Ibrt9HJM7qE82FLRttI',
  });

  inject('googlemap', googlemap)
}
