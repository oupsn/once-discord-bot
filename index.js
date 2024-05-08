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
  //console.log(`Logged in as ${client.user.tag}!`);\
  console.log("Once is running!!!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "create") {
    const name = interaction.options.get("name");
    const duration = interaction.options.get("duration")?.value;
    const category = interaction.options.get("category");
    const isCountdown = interaction.options.get("countdown")?.value;
    let createdChannel;
    try {
      createdChannel = await interaction.guild.channels.create({
        name: name?.value,
        type: ChannelType.GuildVoice,
        parent: category.value,
      });
      interaction.reply({
        content: `**${
          name?.value
        }** created! This channel will disappear at **${dayjs(
          dayjs().add(duration, "minute")
        )
          .tz("Asia/Bangkok")
          .format("YYYY-MM-DD HH:mm:ss")}**`,
        ephemeral: true,
      });
    } catch (error) {
      console.log("Error: " + error);
    }

    if (isCountdown) {
      let remainingTime = duration * 60 * 1000;
      const interval = setInterval(async () => {
        remainingTime -= 1000;
        if (remainingTime == 60000) {
          interaction.channel.send(
            `**${name.value}** will end in less than **1 minute**`
          );
        } else if (remainingTime == 30000) {
          interaction.channel.send(
            `**${name.value}** will end in less than **30 seconds**`
          );
        } else if (remainingTime == 10000) {
          interaction.channel.send(
            `**${name.value}** will end in less than **10 seconds**`
          );
        } else if (remainingTime == 5000 && remainingTime > 0) {
          interaction.channel.send(
            `**${name.value}** will end in less than **5 seconds**`
          );
        } else if (remainingTime == 0) {
          interaction.channel.send(`**${name.value} has ended**`);
          clearInterval(interval);
          try {
            await interaction.guild.channels.delete(
              createdChannel.id,
              "Event ended"
            );
          } catch (error) {
            console.log("Error: " + error);
          }
        }
      }, 1000);
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content === "Hi") {
    message.reply("Hello!");
  }
});

client.login(process.env.TOKEN);
