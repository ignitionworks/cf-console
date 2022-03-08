import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'

import { useState } from 'react'
import Orgs from './orgs'

const server = process.env.NEXT_PUBLIC_API_HOST

export default function Search() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  const updateSearch = (e) => {
    setSearch(e.target.value)
  }

  const startSearch = async () => {
    console.log('server', server, `${server}/api/getRoutesBySearch?query=${search}`)
    const result = await fetch(`${server}/api/getRoutesBySearch?query=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const { data } = await result.json()
    setResults(data)
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      py={12}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        boxShadow={'2xl'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        p={10}
        spacing={8}
        align={'center'}>
        <Stack align={'center'} spacing={2}>
          <Heading
            textTransform={'uppercase'}
            fontSize={'3xl'}
            color={useColorModeValue('gray.800', 'gray.200')}>
            Search
          </Heading>
          <Text fontSize={'lg'} color={'gray.500'}>
            Search for a route
          </Text>
        </Stack>
        <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
          <Input
            type={'text'}
            placeholder={'url'}
            onChange={updateSearch}
            color={useColorModeValue('gray.800', 'gray.200')}
            bg={useColorModeValue('gray.100', 'gray.600')}
            rounded={'full'}
            border={0}
            _focus={{
              bg: useColorModeValue('gray.200', 'gray.800'),
              outline: 'none',
            }}
          />
          <Button
            bg={'blue.400'}
            rounded={'full'}
            onClick={startSearch}
            color={'white'}
            flex={'1 0 auto'}
            _hover={{ bg: 'blue.500' }}
            _focus={{ bg: 'blue.500' }}>
            Search
          </Button>
        </Stack>
        <Stack>
          { results.length > 0 && (<Orgs orgs={results} />)}
        </Stack>
      </Stack>
    </Flex>
  )
}
