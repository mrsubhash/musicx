import NextImage from "next/image";
import NextLink from "next/link";
import {
  Box,
  Divider,
  Flex,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import { usePlaylist } from "../lib/hooks";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];

// const playlists = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);

const Sidebar = () => {
  const { playlists } = usePlaylist();
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Flex direction="column" paddingY="20px" maxHeight="100%">
        <Box>
          <Box marginBottom="20px" paddingX="20px">
            <NextImage
              src="/musicx-logos_white.png"
              height="60px"
              width="180px"
              objectFit="cover"
            />
          </Box>
          <Box marginBottom="20px">
            <List spacing={2}>
              {navMenu.map((menu) => {
                return (
                  <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                    <LinkBox>
                      <NextLink href={menu.route} passHref>
                        <LinkOverlay>
                          <ListIcon
                            as={menu.icon}
                            color="white"
                            marginRight="20px"
                          />
                          {menu.name}
                        </LinkOverlay>
                      </NextLink>
                    </LinkBox>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box marginTop="20px">
            <List spacing={2}>
              {musicMenu.map((menu) => {
                return (
                  <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                    <LinkBox>
                      <NextLink href={menu.route} passHref>
                        <LinkOverlay>
                          <ListIcon
                            as={menu.icon}
                            color="white"
                            marginRight="20px"
                          />
                          {menu.name}
                        </LinkOverlay>
                      </NextLink>
                    </LinkBox>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
        <Divider color="gray.800" marginTop="20px" />
        <Box overflowY="auto" paddingY="20px">
          <List spacing={2}>
            {playlists.sort(playlistSortFn).map((playlist) => {
              return (
                <ListItem paddingX="20px" fontSize="16px" key={playlist.id}>
                  <LinkBox>
                    <NextLink
                      href={{
                        pathname: "/playlist/[id]",
                        query: {
                          id: playlist.id,
                        },
                      }}
                      passHref
                    >
                      <LinkOverlay>{playlist.name}</LinkOverlay>
                    </NextLink>
                  </LinkBox>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;

function playlistSortFn(a, b) {
  return a.name.split("#")[1] - b.name.split("#")[1];
}
