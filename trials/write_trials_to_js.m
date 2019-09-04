load('unique_trials.mat')  
%in order: sample, left option, right option, trialtype, network type
%(1=bi)
%(left is always correct_side)

%need to add the side key
trials = [[trials, ones(size(trials, 1), 1)]; [trials(:, 1), trials(:, 3), trials(:, 2), trials(:, 4:end), ones(size(trials, 1), 1)+1]];

nsamples = max(trials(:, 1));

trials = trials-1;


bi = trials(trials(:, 5) == 0, :);
un = trials(trials(:, 5) > 0, :);

un(:, 1:3) = un(:, 1:3)-nsamples/2;

%% unidirectional trials %%
f = fopen('unidirectional.js', 'w');
fprintf(f, '%s\n', 'var un_trials = {');

fprintf(f, '%s', 'sample : [');
for i = 1:(size(un, 1)-1)
    fprintf(f, '%s, ', num2str(un(i, 1)));
end
fprintf(f, '%s', num2str(un(i+1, 1)));
fprintf(f, '%s\n', '],');

fprintf(f, '%s', 'lstim : [');
for i = 1:(size(un, 1)-1)
    fprintf(f, '%s, ', num2str(un(i, 2)));
end
fprintf(f, '%s', num2str(un(i+1, 2)));
fprintf(f, '%s\n', '],');

fprintf(f, '%s', 'rstim : [');
for i = 1:(size(un, 1)-1)
    fprintf(f, '%s, ', num2str(un(i, 3)));
end
fprintf(f, '%s', num2str(un(i+1, 3)));
fprintf(f, '%s\n', '],');

fprintf(f, '%s', 'trialtype : [');
for i = 1:(size(un, 1)-1)
    fprintf(f, '%s, ', num2str(un(i, 4)));
end
fprintf(f, '%s', num2str(un(i+1, 4)));
fprintf(f, '%s\n', '],');

fprintf(f, '%s', 'network : [');
for i = 1:(size(un, 1)-1)
    fprintf(f, '%s, ', num2str(un(i, 5)));
end
fprintf(f, '%s', num2str(un(i+1, 5)));
fprintf(f, '%s\n', '],');

fprintf(f, '%s', 'correct_side : [');
for i = 1:(size(un, 1)-1)
    fprintf(f, '%s, ', num2str(un(i, 6)));
end
fprintf(f, '%s', num2str(un(i+1, 6)));
fprintf(f, '%s\n', ']');

fprintf(f, '%s\n', '}');
fclose(f);

%% bidirectional trials %%
f = fopen('bidirectional.js', 'w');
fprintf(f, '%s\n', 'var bi_trials = {');

fprintf(f, '%s', 'sample : [');
for i = 1:(size(bi, 1)-1)
    fprintf(f, '%s, ', num2str(bi(i, 1)));
end
fprintf(f, '%s', num2str(bi(i+1, 1)));
fprintf(f, '%s\n', '],');

fprintf(f, '%s', 'lstim : [');
for i = 1:(size(bi, 1)-1)
    fprintf(f, '%s, ', num2str(bi(i, 2)));
end
fprintf(f, '%s', num2str(bi(i+1, 2)));
fprintf(f, '%s\n', '],');

fprintf(f, '%s', 'rstim : [');
for i = 1:(size(bi, 1)-1)
    fprintf(f, '%s, ', num2str(bi(i, 3)));
end
fprintf(f, '%s', num2str(bi(i+1, 3)));
fprintf(f, '%s\n', '],');

fprintf(f, '%s', 'trialtype : [');
for i = 1:(size(bi, 1)-1)
    fprintf(f, '%s, ', num2str(bi(i, 4)));
end
fprintf(f, '%s', num2str(bi(i+1, 4)));
fprintf(f, '%s\n', '],');

fprintf(f, '%s', 'network : [');
for i = 1:(size(bi, 1)-1)
    fprintf(f, '%s, ', num2str(bi(i, 5)));
end
fprintf(f, '%s', num2str(bi(i+1, 5)));
fprintf(f, '%s\n', '],');

fprintf(f, '%s', 'correct_side : [');
for i = 1:(size(bi, 1)-1)
    fprintf(f, '%s, ', num2str(bi(i, 6)));
end
fprintf(f, '%s', num2str(bi(i+1, 6)));
fprintf(f, '%s\n', ']');

fprintf(f, '%s\n', '}');
fclose(f);