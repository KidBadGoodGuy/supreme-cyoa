import json
import os
from datetime import datetime
from typing import Dict, Any, Optional

class RamayanaGameData:
    """Manages game state serialization and persistence for Ramayana CYOA."""

    def __init__(self, save_dir: str = "saves"):
        self.save_dir = save_dir
        self.ensure_save_dir()

    def ensure_save_dir(self) -> None:
        """Ensure the save directory exists."""
        if not os.path.exists(self.save_dir):
            os.makedirs(self.save_dir, exist_ok=True)

    def create_save_file(self, game_state: Dict[str, Any], filename: Optional[str] = None) -> str:
        """
        Create a save file from game state.

        Args:
            game_state: Dictionary containing all game state variables
            filename: Optional custom filename (defaults to timestamp-based)

        Returns:
            Path to the created save file
        """
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"ramayana_save_{timestamp}.json"

        filepath = os.path.join(self.save_dir, filename)

        # Add metadata
        save_data = {
            "metadata": {
                "version": "1.0.4",
                "timestamp": datetime.now().isoformat(),
                "game": "The Ramayana Adventure: Banwas"
            },
            "gameState": game_state
        }

        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(save_data, f, indent=2, ensure_ascii=False)

        return filepath

    def load_save_file(self, filepath: str) -> Dict[str, Any]:
        """
        Load a save file and return the game state.

        Args:
            filepath: Path to the save file

        Returns:
            Dictionary containing the game state

        Raises:
            FileNotFoundError: If the file doesn't exist
            json.JSONDecodeError: If the file is not valid JSON
        """
        if not os.path.exists(filepath):
            raise FileNotFoundError(f"Save file not found: {filepath}")

        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        return data.get("gameState", data)

    def list_saves(self) -> list:
        """
        List all available save files.

        Returns:
            List of save file paths sorted by modification time (newest first)
        """
        if not os.path.exists(self.save_dir):
            return []

        saves = []
        for filename in os.listdir(self.save_dir):
            if filename.endswith('.json'):
                filepath = os.path.join(self.save_dir, filename)
                saves.append({
                    'filename': filename,
                    'path': filepath,
                    'modified': os.path.getmtime(filepath)
                })

        return sorted(saves, key=lambda x: x['modified'], reverse=True)

    def delete_save(self, filepath: str) -> bool:
        """
        Delete a save file.

        Args:
            filepath: Path to the save file

        Returns:
            True if deleted successfully, False otherwise
        """
        try:
            if os.path.exists(filepath):
                os.remove(filepath)
                return True
            return False
        except Exception as e:
            print(f"Error deleting save file: {e}")
            return False

    def validate_save_file(self, filepath: str) -> bool:
        """
        Validate that a save file has the correct structure.

        Args:
            filepath: Path to the save file

        Returns:
            True if valid, False otherwise
        """
        try:
            data = self.load_save_file(filepath)
            required_fields = [
                'currentScene', 'playerName', 'historyStack',
                'dayNightMode'
            ]
            return all(field in data for field in required_fields)
        except Exception:
            return False


class WorldStateEngine:
    """Deterministic reactive RPG rules for the Ramayana Adventure prototype."""

    def __init__(self, state: Optional[Dict[str, Any]] = None):
        self.state = state or self.default_state()

    @staticmethod
    def default_state() -> Dict[str, Any]:
        return {
            "player": {
                "stats": {"dharma": 50, "knowledge": 45, "persuasion": 40, "perception": 40},
                "discoveries": [],
                "choiceHistory": [],
            },
            "relationships": {},
            "reputations": {"ayodhya": 0, "hermitages": 0, "kishkindha": 0, "lanka": 0},
            "quests": {},
            "world_events": {},
            "unlocks": [],
        }

    def discovered(self, key: str) -> bool:
        return key in self.state["player"].setdefault("discoveries", [])

    def unlock(self, key: str) -> None:
        unlocks = self.state.setdefault("unlocks", [])
        if key not in unlocks:
            unlocks.append(key)

    def relationship_value(self, character: str, trait: str) -> int:
        return int(self.state.setdefault("relationships", {}).setdefault(character, {}).get(trait, 0))

    def change_relationship(self, character: str, trait: str, amount: int) -> None:
        traits = self.state.setdefault("relationships", {}).setdefault(character, {})
        traits[trait] = max(-100, min(100, int(traits.get(trait, 0)) + amount))

    def record_choice(self, choice_id: str, effects: Optional[Dict[str, int]] = None) -> Dict[str, Any]:
        self.state["player"].setdefault("choiceHistory", []).append(choice_id)
        for stat, amount in (effects or {}).items():
            stats = self.state["player"].setdefault("stats", {})
            stats[stat] = max(0, min(100, int(stats.get(stat, 0)) + amount))
        return self.evaluate()

    def evaluate(self) -> Dict[str, Any]:
        stats = self.state["player"].setdefault("stats", {})
        if stats.get("knowledge", 0) >= 50 and self.discovered("ancient_inscription") and self.relationship_value("scholar", "trust") >= 70:
            self.unlock("scholar_secret_dialogue")
        if stats.get("perception", 0) >= 45 and self.discovered("hidden_forest_path"):
            self.unlock("safe_dandaka_route")
        if self.relationship_value("hanuman", "trust") >= 60:
            self.unlock("hanuman_confides_lanka_details")
        return self.state


# Default game data manager instance
game_data = RamayanaGameData()

# Example usage
if __name__ == "__main__":
    # Create sample game state
    sample_state = {
        "currentScene": 1,
        "playerName": "Rama",
        "fatherName": "Dasharatha",
        "motherName": "Kausalya",
        "wifeName": "Sita",
        "siblingOneName": "Lakshmana",
        "siblingTwoName": "Bharata",
        "siblingThreeName": "Shatrughna",
        "dayNightMode": "day",
        "broughtLakshmana": True,
        "wentAlone": False,
        "historyStack": [1, 3, 4, 71]
    }

    # Save the game state
    save_path = game_data.create_save_file(sample_state)
    print(f"Game saved to: {save_path}")

    # Load it back
    loaded_state = game_data.load_save_file(save_path)
    print(f"Loaded state: {loaded_state['playerName']} at scene {loaded_state['currentScene']}")

    # List all saves
    all_saves = game_data.list_saves()
    print(f"Total saves: {len(all_saves)}")
    for save in all_saves[:3]:
        print(f"  - {save['filename']}")
