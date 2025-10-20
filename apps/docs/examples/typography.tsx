"use client";

import "@repo/typography";
import Image from "next/image";

const Example = () => (
  <div className="size-full overflow-y-auto">
    <div className="typography">
      <h1>The Art of Sourdough: From Starter to Artisan Loaf</h1>

      <p>
        Few things are as satisfying as pulling a perfectly golden, crackling
        sourdough loaf from your own oven. The ancient art of wild yeast
        fermentation has experienced a renaissance, with home bakers around the
        world cultivating their own <code>starter cultures</code> and mastering
        the delicate balance of flour, water, time, and temperature.
      </p>

      <h2>Getting Started</h2>
      <p>
        Creating your first sourdough starter is a journey that requires
        patience and attention. Unlike commercial yeast, wild yeast and
        beneficial bacteria work slowly, developing complex flavors that simply
        cannot be rushed or replicated with instant ingredients.
      </p>

      <h3>Essential Equipment</h3>
      <ul>
        <li>Large mixing bowl (glass or ceramic preferred)</li>
        <li>Kitchen scale for precise measurements</li>
        <li>Dutch oven or baking stone</li>
      </ul>

      <h3>Basic Ingredients</h3>
      <ol>
        <li>Bread flour (12-13% protein content)</li>
        <li>Filtered or spring water (chlorine-free)</li>
        <li>Your active sourdough starter</li>
      </ol>

      <h2>Baking Day Checklist</h2>
      <ul>
        <li>
          <input checked disabled type="checkbox" />{" "}
          <p>Feed starter 8-12 hours before</p>
        </li>
        <li>
          <input disabled type="checkbox" /> <p>Mix and autolyse dough</p>
        </li>
        <li>
          <input disabled type="checkbox" /> <p>Complete stretch and folds</p>
        </li>
      </ul>

      <h2>Visual Guide</h2>
      <p>
        A properly developed loaf should have an open, airy crumb structure with
        irregular holes. The crust should be deep golden brown with natural
        caramelization.
      </p>
      <center>
        <Image
          alt="Artisan sourdough bread"
          height={400}
          src="https://placehold.co/600x400"
          unoptimized
          width={600}
        />
      </center>

      <h2>Starter Recipe</h2>
      <pre>
        <code>{`Day 1: Mix 50g flour + 50g water
Day 2-7: Discard half, feed daily
Week 2: Ready when doubles in 4-6 hours
Temperature: 75-80°F (24-27°C) optimal`}</code>
      </pre>

      <h2>Baker's Wisdom</h2>
      <blockquote>
        "Bread baking is one of those almost hypnotic businesses, like a dance
        from some ancient ceremony. It leaves you filled with one of the world's
        sweetest smells... there is no chiropractic treatment, no Yoga exercise,
        no hour of meditation in a music-throbbing chapel that will leave you
        emptier of bad thoughts than this homely ceremony of making bread."
        — M.F.K. Fisher
      </blockquote>

      <h2>Fermentation Timeline</h2>
      <table>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Duration</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bulk Fermentation</td>
            <td>4-6 hours</td>
            <td>75-78°F</td>
          </tr>
          <tr>
            <td>Cold Proof</td>
            <td>12-48 hours</td>
            <td>38-40°F</td>
          </tr>
          <tr>
            <td>Baking</td>
            <td>35-45 minutes</td>
            <td>450-500°F</td>
          </tr>
        </tbody>
      </table>

      <h2>Tips & Techniques</h2>
      <p>
        Always use <strong>high-quality flour</strong> for best results,{" "}
        <em>organic when possible</em>. <u>Temperature control</u> is crucial —
        consider using a{" "}
        <a href="https://example.com">proofing box or heating pad</a>. The{" "}
        <code>stretch and fold</code> technique develops gluten without
        kneading.
      </p>

      <h2>Terminology</h2>
      <dl>
        <dt>Autolyse</dt>
        <dd>
          Resting period where flour absorbs water before adding starter and
          salt
        </dd>
        <dt>Bulk Fermentation</dt>
        <dd>First rise after mixing, typically 4-6 hours at room temperature</dd>
        <dt>Banneton</dt>
        <dd>Proofing basket used to support dough during final rise</dd>
      </dl>

      <h2>Troubleshooting</h2>
      <details>
        <summary>Why is my bread too dense?</summary>
        <p>
          Dense bread often results from under-fermentation, insufficient gluten
          development, or weak starter. Ensure your starter passes the float
          test and allow adequate bulk fermentation time.
        </p>
      </details>

      <h2>Advanced Techniques</h2>
      <p>
        Master bakers focus on <strong>precise hydration ratios</strong> and{" "}
        <em>careful temperature management</em>. <u>Score patterns</u> aren't
        just decorative — they control{" "}
        <a href="https://example.com">oven spring direction</a>.{" "}
        <mark>The key is consistent practice</mark> and{" "}
        <small>making detailed notes</small>.{" "}
        <abbr title="Percentage of water to flour">Hydration</abbr> typically
        ranges from 65-85%.
      </p>

      <h2>Baker's Math</h2>
      <p>
        Professional bakers use percentages: 1000g flour at 75% hydration
        requires 750g water
        <sup>*</sup>. Common chemical leavening uses CO<sub>2</sub> production.
      </p>

      <h2>Final Thoughts</h2>
      <p>
        Sourdough baking is equal parts science and art. Every loaf teaches you
        something new about fermentation, gluten development, and the interplay
        of time and temperature. Keep detailed notes, trust the process, and
        remember that even imperfect loaves taste wonderful fresh from the oven.
      </p>
    </div>
  </div>
);

export default Example;
