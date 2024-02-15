import * as React from "react";
import { useState, useEffect } from "react";
import { parseEther, formatEther } from "viem";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import BuyNFTForm from "@/components/BuyNFTForm";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Divider,
  Button,
  ButtonGroup,
  Stack,
  HStack,
  VStack,
  Image,
  Text,
  Wrap,
  WrapItem,
  Link,
  ExternalLinkIcon,
  Center,
} from "@chakra-ui/react";
export default function NFTCard(props) {
  const [imageURI, setImageURI] = useState("");

  async function updateUI() {
    console.log(`The TokenURI is ipfs://${props.cid}`);
    if (props.cid) {
      const requestURL = "https://ipfs.io/ipfs/" + props.cid;
      const tokenURIResponse = await (await fetch(requestURL)).json();
      const imageURI = tokenURIResponse.image;
      const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      setImageURI(imageURIURL);
    }
  }

  useEffect(() => {
    updateUI();
  });

  return (
    <>
      <div>
        <Card maxW="sm" className="h-full w-full bg-heroImage m-2">
          <CardBody>
            <Center>
              {imageURI ? (
                <Image src={imageURI} boxSize="250px" borderRadius="lg" />
              ) : (
                <div>Loading...</div>
              )}
            </Center>
            <Stack mt="2" spacing="3">
              <Heading size="md">Token ID : {props.tokenId}</Heading>

              <div>
                <a
                  target="_blank"
                  rel="noreferrer noopenner"
                  href={`https://sepolia.etherscan.io/address/${props.nftAddress}`}
                >
                  <Text className="font-sans font-semibold underline underline-offset-1">
                    NFT Address
                  </Text>
                </a>
              </div>
              <div>
                <a
                  target="_blank"
                  rel="noreferrer noopenner"
                  href={`https://sepolia.etherscan.io/address/${props.seller}`}
                >
                  <Text className="font-sans font-semibold underline underline-offset-1">
                    NFT seller
                  </Text>
                </a>
              </div>
              <div>
                <Text className="font-sans font-semibold">
                  Sall price : {formatEther(props.price)}ETH
                </Text>
              </div>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <BuyNFTForm
                contractAddress="0x1c92920ca2445C3c29A9CcC551152317219C61A6"
                nftAddress={props.nftAddress}
                tokenId={props.tokenId}
                price={props.price}
              />
              <Button className="w-[150px] bg-accent text-black rounded-3xl py-2 px-4 hover:bg-secondary hover: text-black transition-all duration-300 ease-in-out">
                Add to cart
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}