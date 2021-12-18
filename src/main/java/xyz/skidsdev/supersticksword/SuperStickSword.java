package xyz.skidsdev.supersticksword;

import net.fabricmc.api.ModInitializer;
import net.fabricmc.fabric.api.item.v1.FabricItemSettings;
import net.minecraft.item.Item;
import net.minecraft.item.ItemGroup;
import net.minecraft.util.Identifier;
import net.minecraft.util.registry.Registry;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.lwjgl.system.CallbackI;

import java.util.ArrayList;
import java.util.List;

public class SuperStickSword implements ModInitializer {
	public static final String MODID = "supersticksword";
	// This logger is used to write text to the console and the log file.
	// It is considered best practice to use your mod id as the logger's name.
	// That way, it's clear which mod wrote info, warnings, and errors.
	public static final Logger LOGGER = LogManager.getLogger(MODID);

	public static final List<Item> ITEMS = new ArrayList<>();

	private static final String[] sizes = new String[] {
			"single", "double", "triple", "quadruple", "quintuple", "hextuple", "septuple", "octuple"
	};

	@Override
	public void onInitialize() {
		for (String size : sizes) {
			Item newItem = new Item(new FabricItemSettings().group(ItemGroup.MISC));
			Registry.register(Registry.ITEM, new Identifier(MODID, size + "_compressed_stick"), newItem);
			ITEMS.add(newItem);
		}
	}
}
