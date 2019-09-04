cd 'C:\Users\vnavarro\OneDrive - University of Iowa\Wasserman''s Lab\Experiments\2019 BidirectionalTurk\bi\exp\trials'

nsamples = 6;

bi = {eye(nsamples), eye(nsamples)};
un = bi;
un{2} = [un{2}(:, 2:end), un{2}(:, 1)];

trials = [];

for t = 1:2
    for s = 1:nsamples
        sp = find(bi{t}(s, :));
        for o = find(bi{t}(s, :) < 1)
            trials = [trials; [s, sp, o, t, 1]];
        end
    end
end

for t = 1:2
    for s = 1:nsamples
        sp = find(un{t}(s, :));
        for o = find(un{t}(s, :) < 1)
            trials = [trials; [nsamples+s, nsamples+sp, nsamples+o, t, 2]];
        end
    end
end


%get samples and their correct options
u = trials(trials(:, 5) == 2, :);
t = [unique(u(:, [1, 2, 4]), 'rows'), zeros(nsamples*2, 1)];
t = sortrows(t, 3);

%coded after R's 'processing data' code for the human data.
for si = 1:size(t, 1)
    t(si, 4) = t(t(:, 2) == t(si, 1) & t(:, 3) == find(~ismember([1, 2], t(si, 3))), 1);
end

%mark in trial types in training matrix
for e = 1:size(t, 1)
    trials(trials(:, 1) == t(e, 1) & trials(:, 4) == t(e, 3) & trials(:, 3) == t(e, 4), 5) = 3;
end

%sparsely encode options and correct output vector
opts = zeros(size(trials, 1), nsamples*2);
copts = opts-1;
samps = opts;
for i = 1:size(opts, 1)
    opts(i, [trials(i, 2), trials(i, 3)]) = [1, 1];
    copts(i, trials(i, 2)) = 1;
    samps(i, trials(i, 1)) = 1;
end



save('unique_trials.mat', 'trials')