import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';


import AccountBalance from './AccountBalance';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import { useApp } from 'src/contexts/AppContext';
import React from 'react';

function DashboardCrypto() {
  const [products, setProducts] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState<{id:number; name:string;description:string; amount:string;}>();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC0elOkqza7GHNUcPK8UqftlfWoIOksZpo",
  });
  const center = useMemo(() => ({ lat: -17.824858, lng: 31.053028 }), []);
  const { getProducts } = useApp();

  const getAllproducts = async () => {
    const result = await getProducts()
    setProducts(result)

  }

  const [mapRef, setMapRef] = useState();

  React.useEffect(() => {

    getAllproducts()

  }, [])

 
  const markers = [
    { address: "Address1", lat: 18.5204, lng: 73.8567 },
    { address: "Address2", lat: 18.5314, lng: 73.8446 },
    { address: "Address3", lat: 18.5642, lng: 73.7769 },
  ];

  // const onMapLoad = (map) => {
  //   setMapRef(map);
  //   const bounds = new google.maps.LatLngBounds();
  //   markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
  //   map.fitBounds(bounds);
  // };

  const handleMarkerClick = (id:number, name:string,description:string, amount:string, ) => {
    //  mapRef?.panTo({ lat, lng });
     setInfoWindowData({ id, name,description,amount });
    setIsOpen(true);
  };


  return (
    <>
      <Helmet>
        <title>RefuseIt Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
    
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item xs={12}>
          {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerStyle={{
              width: '100%',
              height: '400px'
            }}
            center={center}
            zoom={10}
          >
            {products.map((product,index) => (<Marker key={index}
              position={product.coordinates
              }
              onClick={() => {
             
                 handleMarkerClick(index, product.name,product.description, product.amount );
              }}
              icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
            >  {isOpen && infoWindowData?.id === index && (
              <InfoWindow
                onCloseClick={() => {
                  setIsOpen(false);
                }}
              >
                <h3>{infoWindowData.name}</h3>
              </InfoWindow>
            )}</Marker>))}

          </GoogleMap>
        )}
          </Grid>

        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto
