package xyz.skidsdev.super_stick_sword;

import net.minecraftforge.fml.common.Mod.EventBusSubscriber;
import net.minecraftforge.registries.IForgeRegistryEntry;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.event.RegistryEvent;
import net.minecraft.item.Item;
import net.minecraft.item.SwordItem;
import net.minecraft.item.ItemGroup;
import net.minecraft.item.ItemTier;
import net.minecraft.util.ResourceLocation;

@EventBusSubscriber(modid = SuperStickSwordMod.MODID, bus = EventBusSubscriber.Bus.MOD)
public final class ModEventSubscriber
{
	@SubscribeEvent
	public static void onRegisterItems(RegistryEvent.Register<Item> event)
	{
		event.getRegistry().registerAll(
			setup(new SwordItem(ItemTier.WOOD, 99, -2.4f, new Item.Properties().group(ItemGroup.COMBAT).maxDamage(2500)), "stick_sword"),
			setup(new Item(new Item.Properties().group(ItemGroup.MISC)), "compressed_stick"),
			setup(new Item(new Item.Properties().group(ItemGroup.MISC)), "double_compressed_stick"),
			setup(new Item(new Item.Properties().group(ItemGroup.MISC)), "triple_compressed_stick"),
			setup(new Item(new Item.Properties().group(ItemGroup.MISC)), "quadruple_compressed_stick"),
			setup(new Item(new Item.Properties().group(ItemGroup.MISC)), "quintuple_compressed_stick"),
			setup(new Item(new Item.Properties().group(ItemGroup.MISC)), "sextuple_compressed_stick"),
			setup(new Item(new Item.Properties().group(ItemGroup.MISC)), "septuple_compressed_stick"),
			setup(new Item(new Item.Properties().group(ItemGroup.MISC)), "octuple_compressed_stick")
		);
	}

	public static <T extends IForgeRegistryEntry<T>> T setup(final T entry, final String name)
	{
		return setup(entry, new ResourceLocation(SuperStickSwordMod.MODID, name));
	}

	public static <T extends IForgeRegistryEntry<T>> T setup(final T entry, final ResourceLocation registryName)
	{
		entry.setRegistryName(registryName);
		return entry;
	}
}
