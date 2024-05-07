import { ChannelType, Client, GatewayIntentBits } from "discord.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(utc);
dayjs.extend(timezone);
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "create") {
    const name = interaction.options.get("name");
    const duration = interaction.options.get("duration")?.value;
    const stopDate = dayjs().add(duration, "minute");
    const category = interaction.options.get("category");
    let createdChannel;
    try {
      createdChannel = await interaction.guild.channels.create({
        name: name?.value,
        type: ChannelType.GuildVoice,
        parent: category.value,
      });
      await interaction.reply({
        content: `**${
          name?.value
        }** created! This channel will disappear at **${dayjs(stopDate)
          .tz("Asia/Bangkok")
          .format("YYYY-MM-DD HH:mm:ss")}**`,
        ephemeral: true,
      });
    } catch (error) {
      console.log("Error: " + error);
      await interaction.reply({
        content: "Error: " + error,
        ephemeral: true,
      });
    }

    setTimeout(async () => {
      try {
        await interaction.guild.channels.delete(
          createdChannel.id,
          "Event ended"
        );
      } catch (error) {
        console.log("Error: " + error);
      }
    }, duration * 60 * 1000);
  }
});

// client.on("messageCreate", async (message) => {
//     if(message.content === "Hi") {
//         message.reply("Hello!")
//     }
// });

client.login(process.env.TOKEN);
