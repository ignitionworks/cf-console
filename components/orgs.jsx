import {
  Box,
  SimpleGrid,
  Heading,
  Divider,
} from '@chakra-ui/react';

const Orgs = ({ orgs }) => {
  const groupBy = (items, key) => items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }),
    {},
  )

  const groups = groupBy(orgs, 'orgName')

  return (
    <SimpleGrid columns={1}>
      {Object.keys(groups).map(org => (
        <>
          <Heading key={org}>
          Organisation: {org}
          </Heading>
          <SimpleGrid columns={3}>
            <Heading as='h4' size='md'>
          Space
            </Heading>

            <Heading as='h4'size='md'>
          Route
            </Heading>

            <Heading as='h4'size='md'>
          Apps
            </Heading>

            {groups[org].map(group => (
              <>
                <Box>
                  {group.spaceName}
                </Box>
                <Box>
                  {group.name} ({group.url})
                </Box>
                <Box>
                  {group.apps.join(', ')}
                </Box>
              </>
            ))}
          </SimpleGrid>
          <Divider />
        </>
      ))}
    </SimpleGrid>
  )
}

export default Orgs
