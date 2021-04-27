import { Box, Flex, Link, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/login">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Box>
        <Flex>
          <Box mr={3}>{data.me.username}</Box>
          <Button
            onClick={() => {
              logout();
            }}
            isLoading={logoutFetching}
            variant="link"
          >
            Logout
          </Button>
        </Flex>
      </Box>
    );
  }
  return (
    <Flex zIndex={2} position="sticky" top={0} bg="tan" p={4} ml={"auto"}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
