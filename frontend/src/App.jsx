import { useEffect, useState } from 'react';
import {
  MantineProvider,
  Container,
  Title,
  Table,
  Card,
  Text,
  Button,
  Loader,
  Alert,
} from '@mantine/core';
import { IconShare, IconAlertCircle } from '@tabler/icons-react';
import axios from 'axios';

function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [leaderRes, heatRes] = await Promise.all([
          axios.get('http://localhost:3000/leaderboard'),
          axios.get('http://localhost:3000/heatmap'),
        ]);

        setLeaderboard(leaderRes.data);
        setHeatmapData(heatRes.data);
      } catch (err) {
        console.error('API error:', err);
        setError('Failed to load data. Is the backend running on port 3000?');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadCandidate = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/candidate/${id}`);
      setSelectedCandidate(res.data);
    } catch (err) {
      console.error('Candidate fetch error:', err);
      setError('Failed to load candidate details');
    }
  };

  if (loading) {
    return (
      <MantineProvider defaultColorScheme="light">
        <Container ta="center" py="xl">
          <Loader size="xl" />
          <Text mt="md">Loading candidates...</Text>
        </Container>
      </MantineProvider>
    );
  }

  return (
    <MantineProvider defaultColorScheme="light">
      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="xl">
          Candidate Ranking Dashboard
        </Title>

        {error && (
          <Alert icon={<IconAlertCircle size={24} />} title="Error" color="red" mb="xl">
            {error}
          </Alert>
        )}

        {/* Leaderboard */}
        <Title order={2} mb="md">
          Top 10 Leaderboard
        </Title>
        {leaderboard.length === 0 ? (
          <Text c="dimmed">No data available yet</Text>
        ) : (
          <Table striped highlightOnHover withTableBorder withColumnBorders mb="xl">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Rank</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Score</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {leaderboard.map((c) => (
                <Table.Tr key={c.id}>
                  <Table.Td>{c.rank}</Table.Td>
                  <Table.Td>{c.name}</Table.Td>
                  <Table.Td>{Math.round(c.overall_score)}</Table.Td>
                  <Table.Td>
                    <Button variant="light" onClick={() => loadCandidate(c.id)}>
                      Details
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}

        {/* Skill Heatmap */}
        <Title order={2} mb="md">
          Skill Heatmap
        </Title>
        {heatmapData.length === 0 ? (
          <Text c="dimmed">No heatmap data</Text>
        ) : (
          <Table mb="xl">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Crisis Management</Table.Th>
                <Table.Th>Sustainability</Table.Th>
                <Table.Th>Team Motivation</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {heatmapData.map((d, i) => (
                <Table.Tr key={i}>
                  <Table.Td>{d.name}</Table.Td>
                  <Table.Td
                    bg={`hsl(${120 * (d.crisis_management / 100)}, 70%, 85%)`}
                    c={d.crisis_management > 50 ? 'dark' : 'black'}
                  >
                    {d.crisis_management}
                  </Table.Td>
                  <Table.Td
                    bg={`hsl(${120 * (d.sustainability / 100)}, 70%, 85%)`}
                    c={d.sustainability > 50 ? 'dark' : 'black'}
                  >
                    {d.sustainability}
                  </Table.Td>
                  <Table.Td
                    bg={`hsl(${120 * (d.team_motivation / 100)}, 70%, 85%)`}
                    c={d.team_motivation > 50 ? 'dark' : 'black'}
                  >
                    {d.team_motivation}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}

        {/* Selected Candidate */}
        {selectedCandidate && (
          <Card shadow="md" padding="lg" radius="md" withBorder mt="xl">
            <Title order={3}>{selectedCandidate.name}</Title>
            <Text mt="xs">Experience: {selectedCandidate.experience} years</Text>
            <Text>Skills: {selectedCandidate.skills}</Text>
            <Text mt="md" fw={500}>
              Evaluation Scores:
            </Text>
            <Text>Crisis Management: {selectedCandidate.crisis_management}</Text>
            <Text>Sustainability: {selectedCandidate.sustainability}</Text>
            <Text>Team Motivation: {selectedCandidate.team_motivation}</Text>
            <Text fw={700} mt="md">
              Overall Score: {Math.round(selectedCandidate.overall_score)} (Rank: {selectedCandidate.rank})
            </Text>
            <Button
              leftSection={<IconShare size={18} />}
              variant="outline"
              color="blue"
              mt="lg"
            >
              Share Candidate
            </Button>
          </Card>
        )}
      </Container>
    </MantineProvider>
  );
}

export default App;