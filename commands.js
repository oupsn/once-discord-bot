import { ApplicationCommandOptionType, REST, Routes } from "discord.js";

const commands = [
  {
    name: "create",
    description: "Create a new channel",
    options: [
      {
        name: "name",
        description: "The name of the channel",
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: "duration",
        description: "The duration of the event in minutes",
        type: ApplicationCommandOptionType.Integer,
        required: true
      },
      {
        name: "category",
        description: "The category of the channel",
        type: ApplicationCommandOptionType.Channel,
        required: true
      }
    ]
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.log("Error: " + error);
  }
})();
