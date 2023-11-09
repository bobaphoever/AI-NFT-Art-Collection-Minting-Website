import { ConnectWallet, Web3Button, useActiveListings, useAddress, useContract, useContractRead, useMetadata, useNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { MediaRenderer } from "@thirdweb-dev/react";
import { Skeleton } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { ContractMetadata } from "@thirdweb-dev/react";
import { Container } from "@chakra-ui/react";
import Image from "/.public/images/OIG(1).jpg";

const Home: NextPage = () => {
  const contractAddress = "0x8024eb3717EA82D178d6472050C6E46520299e19";

  const {contract} = useContract(contractAddress);
  const { data: metadata, isLoading: isLoadingMetaData } = useMetadata(contract);
  const { data: nfts, isLoading, error } = useNFTs(contract, { start: 0, count: 100 });
  const { data: totalMinted, isLoading: isLoadingTotalMinted } = useContractRead(contract, "totalMinted");
  const address = useAddress();

  return (
    <main className={styles.main}>
      <div>
      <Container maxW={'1250px'} >
          <h1 className={styles.title} style={{ textAlign: 'center' , textShadow: '2px 2px 8px'}}>
            Welcome to the Metropolis of Tomorrow NFT Collection
          </h1>
          <SimpleGrid columns={1} spacing={10}>
          <Skeleton isLoaded={!isLoadingMetaData}>
            <Flex p={'20px'} direction='column' style={{alignItems: 'center'}}>
            <MediaRenderer src={(metadata as {image: string})?.image} style={{border: '2px solid #fff', borderRadius: '5px'}}/>&nbsp;&nbsp;&nbsp;
            <Text style={{textAlign: 'center'}}>{(metadata as {description: string})?.description}</Text>
            <Skeleton isLoaded={!isLoadingMetaData}>
              <p style={{textAlign: 'center'}}>Total Minted: {totalMinted?.toNumber()}/5</p>
              {address ? (
                <Web3Button
                  contractAddress={contractAddress}
                  action={(contract) => contract.erc721.claim(1)}
                  style={{border: '3px solid rgb(150, 255, 255)', borderRadius: '15px', fontWeight: 'bold', color: '#fff', background: 'rgb(0, 120, 255)', transition: 'all 0.15s ease-in-out', alignItems: 'center'}}
                >Claim</Web3Button>
              ) : (
                <Text>Please connect your wallet to claim</Text>
              )}&nbsp;&nbsp;&nbsp;
            <ConnectWallet className={styles.button} style={{
              border: '3px solid rgb(150, 255, 255)',
              borderRadius: '15px',
              fontWeight: 'bold',
              color: '#fff',
              background: 'rgb(0, 120, 200)',
              transition: 'all 0.15s ease-in-out',
              alignItems: 'center',
            }}></ConnectWallet>
            </Skeleton>
            </Flex>
          </Skeleton>
          </SimpleGrid>
      </Container>
      </div>
    </main>
  );
};

export default Home;
