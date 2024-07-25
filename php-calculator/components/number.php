<div class="grid grid-cols-5 gap-4">
    <?php foreach ($numbers as $number) {  ?>
        <input 
            type="submit"
            name="<?php echo $number ?>" 
            value="<?php echo $number ?>" 
            class='focus:outline-none py-2 text-center button-shadow rounded-md <?php echo ($number==="DEL" || $number==="AC") ? "bg-red-800" : "bg-zinc-700" ?>'>
    <?php } ?>
    
</div>
<input type="hidden" name="input" value='<?php echo json_encode($screenValue); ?>' />
<pre><?php print_r($test); ?></pre>


