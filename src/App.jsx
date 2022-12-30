import {
  Button,
  Flex,
  Image,
  Input,
  Kbd,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BsFillCloudSunFill, BsInfoCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ReactAnimatedWeather from "react-animated-weather";
import { MdLocationOn } from "react-icons/md";
import { HiHome, HiMenuAlt3, HiSearch } from "react-icons/hi";
import moment from "moment";

import "./App.css";
import { useEffect, useRef, useState } from "react";
import { fetchForecast } from "./actions/forecast";
import { motion } from "framer-motion";

function App() {
  const dispatch = useDispatch();
  const { data, location, loading, error } = useSelector(
    (state) => state.forecast
  );
  const [index, setIndex] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchForecast("jakarta"));
  }, [dispatch]);

  if (!loading && error) {
    toast({
      title: "Location not found",
      description: error,
      status: "error",
      duration: 800,
      isClosable: true,
    });
  }

  return (
    <Stack>
      <AppBar toggleColorMode={toggleColorMode} colorMode={colorMode} />
      <Flex
        px={{ base: "0.5rem", lg: "2rem", xl: "14rem" }}
        align="center"
        mt={{ base: "7rem !important", lg: "10rem !important" }}
        flexDir={{ base: "column", lg: "row" }}
        gap={{ base: "1rem", lg: "0" }}
      >
        <WeatherCard
          location={location}
          data={data}
          index={index}
          loading={loading}
        />
        <WeatherInfo
          data={data}
          index={index}
          setIndex={setIndex}
          colorMode={colorMode}
        />
      </Flex>
      <Flex
        gap={{ base: "2", md: "4rem" }}
        px={{ base: "2rem", md: "4rem", lg: "2rem", xl: "14rem" }}
        py={12}
        bg="accent1"
        justify="space-between"
        mt={{ base: "2rem !important", lg: "12rem !important" }}
        w="100%"
        flexDir={{ base: "column", md: "row" }}
        id="details"
      >
        <Stack w="100%">
          <Flex borderRadius="24px" justify="space-between">
            <Text fontSize={18} fontWeight="bold" color="primary">
              Avg Temperature
            </Text>
            <Text fontSize={18} fontWeight="normal" color="primary">
              {data[index]?.main.temp}°C
            </Text>
          </Flex>
          <Flex borderRadius="24px" justify="space-between">
            <Text fontSize={18} fontWeight="bold" color="primary">
              Min Temperature
            </Text>
            <Text fontSize={18} fontWeight="normal" color="primary">
              {data[index]?.main.temp_min}°C
            </Text>
          </Flex>
          <Flex borderRadius="24px" justify="space-between">
            <Text fontSize={18} fontWeight="bold" color="primary">
              Max Temperature
            </Text>
            <Text fontSize={18} fontWeight="normal" color="primary">
              {data[index]?.main.temp_max}°C
            </Text>
          </Flex>
          <Flex borderRadius="24px" justify="space-between">
            <Text fontSize={18} fontWeight="bold" color="primary">
              Feels Like
            </Text>
            <Text fontSize={18} fontWeight="normal" color="primary">
              {data[index]?.main.feels_like}°C
            </Text>
          </Flex>
          <Flex borderRadius="24px" justify="space-between">
            <Text fontSize={18} fontWeight="bold" color="primary">
              Sea Level
            </Text>
            <Text fontSize={18} fontWeight="normal" color="primary">
              {data[index]?.main.sea_level} hPa
            </Text>
          </Flex>
          <Flex borderRadius="24px" justify="space-between">
            <Text fontSize={18} fontWeight="bold" color="primary">
              Ground Level
            </Text>
            <Text fontSize={18} fontWeight="normal" color="primary">
              {data[index]?.main.grnd_level} hPa
            </Text>
          </Flex>
        </Stack>
        <Stack w="100%">
          <Flex borderRadius="24px" justify="space-between">
            <Text fontSize={18} fontWeight="bold" color="primary">
              Humidty
            </Text>
            <Text fontSize={18} fontWeight="normal" color="primary">
              {data[index]?.main.humidity}%
            </Text>
          </Flex>
          <Flex borderRadius="24px" justify="space-between">
            <Text fontSize={18} fontWeight="bold" color="primary">
              Weather
            </Text>
            <Text fontSize={18} fontWeight="normal" color="primary">
              {data[index]?.weather[0].description}
            </Text>
          </Flex>
          <Flex borderRadius="24px" justify="space-between">
            <Text fontSize={18} fontWeight="bold" color="primary">
              Rain Volume
            </Text>
            <Text fontSize={18} fontWeight="normal" color="primary">
              {data[index]?.rain?.["3h"] || 0} mm
            </Text>
          </Flex>
          <Flex borderRadius="24px" justify="space-between">
            <Text fontSize={18} fontWeight="bold" color="primary">
              Wind Speed
            </Text>
            <Text fontSize={18} fontWeight="normal" color="primary">
              {data[index]?.wind.speed} km/h
            </Text>
          </Flex>
          <Flex borderRadius="24px" justify="space-between">
            <Text fontSize={18} fontWeight="bold" color="primary">
              Wind Direction
            </Text>
            <Text fontSize={18} fontWeight="normal" color="primary">
              {data[index]?.wind.deg}°
            </Text>
          </Flex>
          <Flex borderRadius="24px" justify="space-between">
            <Text fontSize={18} fontWeight="bold" color="primary">
              Wind Gust
            </Text>
            <Text fontSize={18} fontWeight="normal" color="primary">
              {data[index]?.wind.gust} km/h
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
}

const WeatherInfo = ({ data, index, setIndex }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack
      w="100%"
      h={{ base: "auto", lg: "41rem" }}
      borderRadius="24px"
      bg="accent1"
      spacing={2}
      justify="space-between"
      pl={{ base: "2rem", lg: "36rem" }}
      pr={{ base: "2rem", lg: "4rem" }}
      py={{ base: "2rem", lg: "4rem" }}
    >
      <Flex justify="space-between" w="100%" color="primary">
        <Text fontSize={18} fontWeight="bold">
          PRESSURE
        </Text>
        <Text fontSize={18} fontWeight="normal">
          {data[index]?.main.pressure} hPa
        </Text>
      </Flex>
      <Flex justify="space-between" w="100%" color="primary">
        <Text fontSize={18} fontWeight="bold">
          HUMIDITY
        </Text>
        <Text fontSize={18} fontWeight="normal">
          {data[index]?.main.humidity} %
        </Text>
      </Flex>
      <Flex justify="space-between" w="100%" color="primary">
        <Text fontSize={18} fontWeight="bold">
          WIND
        </Text>
        <Text fontSize={18} fontWeight="normal">
          {data[index]?.wind.speed} km/h
        </Text>
      </Flex>
      <Flex
        gap={4}
        mt="10 !important"
        bg="frozen2"
        p={4}
        borderRadius="24px"
        overflow="auto"
      >
        {data?.map((item, i) => (
          <Stack
            key={i}
            bg="accent3"
            px={4}
            py={5}
            borderRadius="24px"
            align="center"
            color="bg"
            cursor="pointer"
            w={{ base: "8.2rem", md: "100%" }}
            _hover={{ bg: "accent2" }}
            onClick={() => setIndex(i)}
            spacing={{ base: "4", lg: "8" }}
          >
            <Stack>
              <ReactAnimatedWeather
                icon={
                  item.weather[0].main === "Clouds"
                    ? "CLOUDY"
                    : item.weather[0].main === "Clear"
                    ? "CLEAR_DAY"
                    : item.weather[0].main === "Rain"
                    ? "RAIN"
                    : item.weather[0].main === "Snow"
                    ? "SNOW"
                    : "CLEAR_DAY"
                }
                color={"white"}
                size={"100"}
                animate={true}
              />
            </Stack>
            <Text fontSize={18} fontWeight="normal" color="white">
              {moment(item.dt_txt).format("ddd")}
            </Text>
            <Text
              fontSize={18}
              fontWeight="bold"
              mt="0 !important"
              color="white"
            >
              {Math.round(item.main.temp * 10) / 10}°C
            </Text>
          </Stack>
        ))}
      </Flex>
      <Button
        bg="linearOpacity2"
        borderRadius={"full"}
        _hover={{ bg: "linearOpacity2" }}
        _active={{ bg: "linearOpacity2" }}
        color="white"
        mt="10 !important"
        h="3rem"
        onClick={onOpen}
      >
        <Flex gap={2}>
          <MdLocationOn fontSize={22} />
          <Text fontWeight="bold" fontSize={18}>
            Change Location
          </Text>
        </Flex>
      </Button>
      <SearchPopup isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

const WeatherCard = ({ location, data, index, loading }) => {
  return (
    <Stack
      position={{ base: "relative", lg: "absolute" }}
      zIndex={2}
      w={{ base: "100%", lg: "32rem" }}
    >
      {loading ? (
        <Flex
          className="pulse loadable"
          bg="#b9b9b932"
          w={{ base: "100%", lg: "32rem" }}
          h="42rem"
          boxShadow="lg"
          borderRadius="24px"
        />
      ) : (
        <Flex justify="space-between">
          <Stack
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            boxShadow="lg"
            whileHover={{
              scale: 1.05,
              rotate: -1,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            borderRadius="24px"
            color="white"
            overflow="hidden"
            bg="linearOpacity1"
            position="relative"
            w={{ base: "100%", lg: "32rem" }}
            align={{ base: "center", lg: "flex-start" }}
            textAlign={{ base: "center", lg: "left" }}
          >
            <Image
              src={"https://source.unsplash.com/800x1200/?" + location}
              position="absolute"
              objectFit="cover"
              w="100%"
              h="100%"
              zIndex={0}
              opacity={0.5}
              fallback={
                <Flex
                  className="pulse loadable"
                  bg="#f0f0f0c7"
                  w={{ base: "100%", md: "32rem" }}
                  h="100%"
                  boxShadow="lg"
                  borderRadius="24px"
                  zIndex={0}
                  position="absolute"
                />
              }
              pointerEvents="none"
            />
            <Stack spacing={-1} px="2rem" py="1rem" zIndex={1}>
              <Text fontSize={38} fontWeight="bold">
                {moment(data[index]?.dt_txt).format("dddd")}
              </Text>
              <Text fontSize={18} fontWeight="medium">
                {moment(data[index]?.dt_txt).format("DD MMM YYYY")}
              </Text>
              <Text fontSize={18} fontWeight="medium">
                {location}
              </Text>
            </Stack>
            <Stack
              w={{ base: "16rem", md: "20rem", lg: "12rem" }}
              mt={{
                base: "4rem !important",
                md: "14rem !important",
                lg: "20rem !important",
              }}
              px="2rem"
              zIndex={1}
              mb="-1rem !important"
            >
              <ReactAnimatedWeather
                icon={
                  data[index]?.weather[0].main === "Clouds"
                    ? "CLOUDY"
                    : data[index]?.weather[0].main === "Clear"
                    ? "CLEAR_DAY"
                    : data[index]?.weather[0].main === "Rain"
                    ? "RAIN"
                    : data[index]?.weather[0].main === "Snow"
                    ? "SNOW"
                    : "CLEAR_DAY"
                }
                color="white"
                size={256}
                animate={true}
              />
            </Stack>
            <Stack px="2rem" py="2rem" zIndex={1} mt="0 !important">
              <Text
                fontSize={{ base: 38, lg: 42 }}
                fontWeight="bold"
                lineHeight={0.6}
              >
                {data[index]?.main.temp}°C
              </Text>
              <Text fontSize={{ base: 18, lg: 20 }} fontWeight="bold">
                {data[index]?.weather[0].description}
              </Text>
            </Stack>
          </Stack>
        </Flex>
      )}
    </Stack>
  );
};

const AppBar = ({ colorMode, toggleColorMode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      justify="space-between"
      align="center"
      w="full"
      h={"4rem"}
      bg="frozen"
      color="primary"
      px={{ base: "1rem", lg: "2rem", xl: "14rem" }}
      py={"3rem"}
      zIndex={3}
      position="fixed"
      backdropFilter="blur(8px)"
    >
      <Flex gap={3} align="center" ml={{ base: "0.4rem", lg: "0" }}>
        <BsFillCloudSunFill fontSize={32} />
        <Text fontSize={28} fontWeight="bold">
          Ramalanku
        </Text>
      </Flex>
      <Flex gap={4} display={{ base: "none", md: "flex" }}>
        <Button variant="ghost" onClick={() => window.scrollTo(0, 0)}>
          <Text fontSize={18} fontWeight="medium">
            Beranda
          </Text>
        </Button>
        <Button
          bg="transparent"
          border={"2px solid"}
          _hover={{ bg: "primary", color: "bg", border: "2px solid" }}
          _active={{ bg: "primary", color: "bg", opacity: 0.8 }}
          onClick={() => {
            window.location.href = "#details";
          }}
        >
          <Text fontSize={18} fontWeight="medium">
            Detail Cuaca
          </Text>
        </Button>
        <ThemeSelector
          colorMode={colorMode}
          toggleColorMode={toggleColorMode}
        />
      </Flex>
      <Button
        px={0}
        h={"3rem"}
        w={"3rem"}
        display={{ base: "flex", md: "none" }}
        variant="ghost"
        _hover={{ bg: "frozen" }}
        _active={{ bg: "frozen" }}
        onClick={onOpen}
      >
        <HiMenuAlt3 fontSize={30} />
      </Button>
      <HamburgerMenu
        isOpen={isOpen}
        onClose={onClose}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
      />
    </Flex>
  );
};

const ThemeSelector = ({ colorMode, toggleColorMode }) => {
  return (
    <Button
      onClick={toggleColorMode}
      variant="ghost"
      colorScheme="gray"
      px={2}
      fontSize={18}
    >
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

const SearchPopup = ({ isOpen, onClose }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const onEnterPress = (e) => {
    if (e.keyCode === 13) {
      dispatch(fetchForecast(search));
      onClose();
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay backdropFilter="auto" backdropBlur={"10px"} />
      <ModalContent
        backgroundColor="secondary"
        maxW={{ base: "full", md: "500", lg: "700", xl: "900" }}
        borderRadius={10}
        pt={2}
        mx={4}
      >
        <ModalBody p={2} mb={2}>
          <Flex flexDirection="column">
            <Flex
              direction="row"
              p={4}
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex flex={25}>
                <HiSearch size="22" />
                <Input
                  ref={initialRef}
                  placeholder="Input Location"
                  variant={"unstyled"}
                  autoComplete="off"
                  spellCheck="false"
                  maxLength={64}
                  ml={4}
                  value={search}
                  onInput={(e) => {
                    setSearch(e.target.value);
                  }}
                  onKeyDownCapture={onEnterPress}
                />
              </Flex>
              <Flex flex={1}>
                <Kbd display={{ base: "none", md: "block" }} ml="2">
                  esc
                </Kbd>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const HamburgerMenu = ({ isOpen, onClose, colorMode, toggleColorMode }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay
        backdropFilter="auto"
        backdropInvert="20%"
        backdropBlur="5px"
      />
      <ModalContent
        align="center"
        mx={{ base: "1rem", md: 0 }}
        px={2}
        py={6}
        borderRadius="24px"
        bg="secondary"
        gap={2}
        maxH="86vh"
        maxW={"24rem"}
        overflowY="auto"
      >
        <ModalBody>
          <Stack gap={2}>
            <Button
              p={4}
              h="4rem"
              color="white"
              bg={"accent2"}
              borderRadius="14px"
              _hover={{
                transition: "all 0.2s ease-in-out",
                background: "primary",
                color: "bg",
              }}
              onClick={() => {
                window.scrollTo(0, 0);
                onClose();
              }}
            >
              <Flex gap={2}>
                <HiHome fontSize={22} />
                <Text>Beranda</Text>
              </Flex>
            </Button>
            <Button
              p={4}
              h="4rem"
              color="white"
              bg={"accent2"}
              borderRadius="14px"
              _hover={{
                transition: "all 0.2s ease-in-out",
                background: "primary",
                color: "bg",
              }}
              onClick={() => {
                window.scrollTo(0, 1000);
                onClose();
              }}
            >
              <Flex gap={2}>
                <BsInfoCircleFill fontSize={22} />
                <Text>Detail Cuaca</Text>
              </Flex>
            </Button>
            <Button
              p={4}
              h="4rem"
              color="white"
              bg={"accent2"}
              borderRadius="14px"
              _hover={{
                transition: "all 0.2s ease-in-out",
                background: "primary",
                color: "bg",
              }}
              onClick={toggleColorMode}
            >
              <Flex gap={2}>
                {colorMode === "dark" ? (
                  <SunIcon fontSize={22} />
                ) : (
                  <MoonIcon fontSize={22} />
                )}
                <Text>{colorMode === "dark" ? "Light Mode" : "Dark Mode"}</Text>
              </Flex>
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default App;
