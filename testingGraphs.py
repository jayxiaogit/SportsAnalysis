import networkx as nx
import matplotlib.pyplot as plt

# Sample tournament data with week information
tournaments = {
    "Week 1": ["Tournament A", "Tournament B", "Tournament C"],
    "Week 2": ["Tournament D", "Tournament E"],
    "Week 3": ["Tournament F", "Tournament G", "Tournament H"]
}

# Sample edges with weights
tournament_edges = [
    ("Tournament A", "Tournament B", 1),
    ("Tournament B", "Tournament C", 1),
    ("Tournament D", "Tournament E", 1),
    ("Tournament F", "Tournament G", 1),
    ("Tournament G", "Tournament H", 1)
]

# Create a directed graph
G = nx.DiGraph()

# Add nodes to the graph and assign positions based on weeks
pos = {}
x = 0
for week, tournaments_in_week in tournaments.items():
    for tournament in tournaments_in_week:
        G.add_node(tournament)
        pos[tournament] = (x, -1)
        x += 1  # Increment x position for the next tournament in the same week
    x += 1  # Add space between weeks

# Add edges with weights to the graph
for edge in tournament_edges:
    tournament1, tournament2, weight = edge
    G.add_edge(tournament1, tournament2, weight=weight)

# Visualize the graph
nx.draw(G, pos, with_labels=True, node_size=2000, node_color='skyblue', font_size=10, font_weight='bold')
edge_labels = {(u, v): d['weight'] for u, v, d in G.edges(data=True)}
nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, label_pos=0.3, font_size=8)

plt.title("Tournament Schedule Graph")
plt.show(block=True)
print("done")